-- database/migrations/01_initial_schema.sql

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    auth0_id VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    zip VARCHAR(20),
    pronouns VARCHAR(50),
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'volunteer', 'participant')),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Volunteers table
CREATE TABLE volunteers (
    id SERIAL PRIMARY KEY,
    auth0_id VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    zip VARCHAR(20),
    pronouns VARCHAR(50),
    training JSONB DEFAULT '[]'::JSONB,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'on-leave', 'inactive')),
    approved_at TIMESTAMP,
    approved_by INTEGER REFERENCES users(id),
    hours_logged INTEGER DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Participants table
CREATE TABLE participants (
    id SERIAL PRIMARY KEY,
    auth0_id VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    zip VARCHAR(20),
    pronouns VARCHAR(50),
    support_needs TEXT,
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Trainings table
CREATE TABLE trainings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    location VARCHAR(255),
    max_participants INTEGER,
    instructor VARCHAR(255),
    duration_hours INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in-progress', 'completed', 'cancelled')),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Volunteer trainings table (many-to-many)
CREATE TABLE volunteer_trainings (
    id SERIAL PRIMARY KEY,
    volunteer_id INTEGER NOT NULL REFERENCES volunteers(id) ON DELETE CASCADE,
    training_id INTEGER NOT NULL REFERENCES trainings(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('not-started', 'in-progress', 'completed', 'waitlisted')),
    progress INTEGER NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
    enrollment_date TIMESTAMP NOT NULL DEFAULT NOW(),
    completion_date TIMESTAMP,
    certificate_url TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (volunteer_id, training_id)
);

-- Events table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    location VARCHAR(255),
    type VARCHAR(20) NOT NULL DEFAULT 'public' CHECK (type IN ('public', 'volunteers', 'participants', 'private')),
    required_volunteers INTEGER DEFAULT 0,
    max_participants INTEGER,
    status VARCHAR(20) NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'cancelled', 'completed')),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Event volunteers table (many-to-many)
CREATE TABLE event_volunteers (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    volunteer_id INTEGER NOT NULL REFERENCES volunteers(id) ON DELETE CASCADE,
    role VARCHAR(100) DEFAULT 'general',
    status VARCHAR(20) NOT NULL CHECK (status IN ('assigned', 'signed_up', 'confirmed', 'checked_in', 'completed', 'cancelled')),
    check_in_time TIMESTAMP,
    check_out_time TIMESTAMP,
    hours_logged NUMERIC(5,2),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (event_id, volunteer_id)
);

-- Participant events table (many-to-many)
CREATE TABLE participant_events (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    participant_id INTEGER NOT NULL REFERENCES participants(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('registered', 'attended', 'cancelled')),
    check_in_time TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (event_id, participant_id)
);

-- Feedback table
CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    volunteer_id INTEGER REFERENCES volunteers(id) ON DELETE CASCADE,
    participant_id INTEGER REFERENCES participants(id) ON DELETE CASCADE,
    feedback_type VARCHAR(20) NOT NULL CHECK (feedback_type IN ('volunteer', 'participant')),
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (event_id, volunteer_id, feedback_type),
    UNIQUE (event_id, participant_id, feedback_type),
    CHECK (
        (volunteer_id IS NOT NULL AND participant_id IS NULL AND feedback_type = 'volunteer') OR
        (participant_id IS NOT NULL AND volunteer_id IS NULL AND feedback_type = 'participant')
    )
);

-- Volunteer availability
CREATE TABLE volunteer_availability (
    id SERIAL PRIMARY KEY,
    volunteer_id INTEGER NOT NULL REFERENCES volunteers(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CHECK (start_time < end_time)
);

-- Resources table
CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('pdf', 'video', 'article', 'link')),
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
