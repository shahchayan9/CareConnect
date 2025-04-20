-- database/seeds/01_sample_data.sql

-- Insert sample users
INSERT INTO users (auth0_id, first_name, last_name, email, phone, address, city, state, zip, pronouns, role, created_at, updated_at)
VALUES
    ('auth0|admin1', 'Admin', 'User', 'admin@namiyolo.org', '555-123-4567', '123 Main St', 'Davis', 'CA', '95616', 'they/them', 'admin', NOW(), NOW()),
    ('auth0|volunteer1', 'Jane', 'Smith', 'jane.smith@example.com', '555-987-6543', '456 Oak Ave', 'Davis', 'CA', '95618', 'she/her', 'volunteer', NOW(), NOW()),
    ('auth0|volunteer2', 'Michael', 'Johnson', 'michael.j@example.com', '555-456-7890', '789 Elm St', 'Woodland', 'CA', '95695', 'he/him', 'volunteer', NOW(), NOW()),
    ('auth0|volunteer3', 'Sarah', 'Williams', 'sarah.w@example.com', '555-234-5678', '101 Pine Rd', 'West Sacramento', 'CA', '95691', 'she/her', 'volunteer', NOW(), NOW()),
    ('auth0|volunteer4', 'David', 'Chen', 'david.c@example.com', '555-345-6789', '202 Cedar Ln', 'Davis', 'CA', '95616', 'he/him', 'volunteer', NOW(), NOW()),
    ('auth0|volunteer5', 'Emily', 'Rodriguez', 'emily.r@example.com', '555-567-8901', '303 Birch Dr', 'Winters', 'CA', '95694', 'she/her', 'volunteer', NOW(), NOW()),
    ('auth0|participant1', 'Robert', 'Miller', 'robert.m@example.com', '555-678-9012', '404 Maple St', 'Davis', 'CA', '95618', 'he/him', 'participant', NOW(), NOW()),
    ('auth0|participant2', 'Lisa', 'Garcia', 'lisa.g@example.com', '555-789-0123', '505 Walnut Ave', 'Woodland', 'CA', '95695', 'she/her', 'participant', NOW(), NOW()),
    ('auth0|participant3', 'James', 'Wilson', 'james.w@example.com', '555-890-1234', '606 Spruce Rd', 'West Sacramento', 'CA', '95691', 'he/him', 'participant', NOW(), NOW());

-- Insert sample volunteers
INSERT INTO volunteers (auth0_id, name, email, phone, address, city, state, zip, pronouns, training, status, hours_logged, created_at, updated_at)
VALUES
    ('auth0|volunteer1', 'Jane Smith', 'jane.smith@example.com', '555-987-6543', '456 Oak Ave', 'Davis', 'CA', '95618', 'she/her', '["Peer-to-Peer", "Crisis Support"]'::jsonb, 'active', 28, NOW(), NOW()),
    ('auth0|volunteer2', 'Michael Johnson', 'michael.j@example.com', '555-456-7890', '789 Elm St', 'Woodland', 'CA', '95695', 'he/him', '["Family-to-Family"]'::jsonb, 'pending', 0, NOW(), NOW()),
    ('auth0|volunteer3', 'Sarah Williams', 'sarah.w@example.com', '555-234-5678', '101 Pine Rd', 'West Sacramento', 'CA', '95691', 'she/her', '["Community Outreach", "Peer-to-Peer"]'::jsonb, 'active', 42, NOW(), NOW());

-- Insert sample participants
INSERT INTO participants (auth0_id, name, email, phone, address, city, state, zip, pronouns, support_needs, emergency_contact_name, emergency_contact_phone, created_at, updated_at)
VALUES
    ('auth0|participant1', 'Robert Miller', 'robert.m@example.com', '555-678-9012', '404 Maple St', 'Davis', 'CA', '95618', 'he/him', 'Weekly support group sessions', 'Mary Miller', '555-111-2222', NOW(), NOW()),
    ('auth0|participant2', 'Lisa Garcia', 'lisa.g@example.com', '555-789-0123', '505 Walnut Ave', 'Woodland', 'CA', '95695', 'she/her', 'Family support and counseling', 'Carlos Garcia', '555-333-4444', NOW(), NOW());

-- Insert sample trainings
INSERT INTO trainings (title, description, category, start_date, end_date, location, max_participants, instructor, duration_hours, status, created_at, updated_at)
VALUES
    ('Peer-to-Peer Basics', 'Foundational training for peer support.', 'Core', '2025-03-10', '2025-03-15', 'NAMI Yolo Office', 15, 'Admin User', 8, 'completed', NOW(), NOW()),
    ('Crisis Intervention', 'Advanced mental health crisis training.', 'Advanced', '2025-04-20', '2025-04-25', 'Davis Community Center', 12, 'Admin User', 12, 'in-progress', NOW(), NOW()),
    ('Family Support Program', 'Training for family support volunteers.', 'Core', '2025-05-10', '2025-05-20', 'Woodland Library', 20, 'Admin User', 16, 'scheduled', NOW(), NOW());

-- Insert sample events
INSERT INTO events (title, description, category, date, start_time, end_time, location, type, required_volunteers, max_participants, status, created_at, updated_at)
VALUES
    ('Weekly Support Group', 'Regular peer support group meeting.', 'Support Group', '2025-04-25', '18:00', '20:00', 'Davis Community Center', 'public', 2, 15, 'scheduled', NOW(), NOW()),
    ('Family Workshop', 'Educational workshop for families.', 'Workshop', '2025-04-28', '10:00', '14:00', 'Woodland Library', 'public', 3, 20, 'scheduled', NOW(), NOW()),
    ('Volunteer Training', 'New volunteer orientation.', 'Training', '2025-05-05', '09:00', '12:00', 'NAMI Yolo Office', 'volunteers', 1, 10, 'scheduled', NOW(), NOW());

-- Insert sample volunteer trainings
INSERT INTO volunteer_trainings (volunteer_id, training_id, status, progress, enrollment_date, completion_date, created_at, updated_at)
SELECT 
    v.id as volunteer_id,
    t.id as training_id,
    'completed' as status,
    100 as progress,
    '2025-03-01'::timestamp as enrollment_date,
    '2025-03-15'::timestamp as completion_date,
    NOW() as created_at,
    NOW() as updated_at
FROM volunteers v
CROSS JOIN trainings t
WHERE v.auth0_id = 'auth0|volunteer1'
AND t.title = 'Peer-to-Peer Basics';

-- Insert sample event volunteers
INSERT INTO event_volunteers (event_id, volunteer_id, role, status, created_at, updated_at)
SELECT 
    e.id as event_id,
    v.id as volunteer_id,
    'facilitator' as role,
    'assigned' as status,
    NOW() as created_at,
    NOW() as updated_at
FROM events e
CROSS JOIN volunteers v
WHERE e.title = 'Weekly Support Group'
AND v.auth0_id = 'auth0|volunteer1';

-- Insert sample participant events
INSERT INTO participant_events (event_id, participant_id, status, created_at, updated_at)
SELECT 
    e.id as event_id,
    p.id as participant_id,
    'registered' as status,
    NOW() as created_at,
    NOW() as updated_at
FROM events e
CROSS JOIN participants p
WHERE e.title = 'Weekly Support Group'
AND p.auth0_id = 'auth0|participant1';

-- Insert sample volunteer availability
INSERT INTO volunteer_availability (volunteer_id, day_of_week, start_time, end_time, created_at, updated_at)
SELECT 
    v.id,
    day_of_week,
    start_time::time,
    end_time::time,
    NOW(),
    NOW()
FROM volunteers v
CROSS JOIN (
    VALUES 
        (1, '18:00', '21:00'),  -- Monday
        (3, '18:00', '21:00'),  -- Wednesday
        (5, '10:00', '16:00')   -- Friday
) as va(day_of_week, start_time, end_time)
WHERE v.auth0_id = 'auth0|volunteer1';

-- Insert sample resources
INSERT INTO resources (title, description, category, type, url, created_at, updated_at)
VALUES
    ('NAMI Basics Guide', 'Educational resource about mental health basics.', 'Education', 'pdf', '/resources/nami-basics.pdf', NOW(), NOW()),
    ('Understanding Depression', 'Information about depression symptoms and treatment.', 'Health', 'article', '/resources/depression-guide.html', NOW(), NOW()),
    ('Crisis Support Guide', 'Guide for handling mental health crises.', 'Support', 'pdf', '/resources/crisis-guide.pdf', NOW(), NOW());