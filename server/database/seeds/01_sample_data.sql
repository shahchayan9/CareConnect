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
    ('auth0|volunteer1', 'Jane Smith', 'jane.smith@example.com', '555-987-6543', '456 Oak Ave', 'Davis', 'CA', '95618', 'she/her', '["Peer-to-Peer", "Crisis Support"]', 'active', 28, NOW(), NOW()),
    ('auth0|volunteer2', 'Michael Johnson', 'michael.j@example.com', '555-456-7890', '789 Elm St', 'Woodland', 'CA', '95695', 'he/him', '["Family-to-Family"]', 'pending', 0, NOW(), NOW()),
    ('auth0|volunteer3', 'Sarah Williams', 'sarah.w@example.com', '555-234-5678', '101 Pine Rd', 'West Sacramento', 'CA', '95691', 'she/her', '["Community Outreach", "Peer-to-Peer"]', 'active', 42, NOW(), NOW()),
    ('auth0|volunteer4', 'David Chen', 'david.c@example.com', '555-345-6789', '202 Cedar Ln', 'Davis', 'CA', '95616', 'he/him', '["Crisis Support"]', 'on-leave', 15, NOW(), NOW()),
    ('auth0|volunteer5', 'Emily Rodriguez', 'emily.r@example.com', '555-567-8901', '303 Birch Dr', 'Winters', 'CA', '95694', 'she/her', '["Peer-to-Peer"]', 'pending', 0, NOW(), NOW());

-- Insert sample participants
INSERT INTO participants (auth0_id, name, email, phone, city, state, zip, pronouns, created_at, updated_at)
VALUES
    ('auth0|participant1', 'Robert Miller', 'robert.m@example.com', '555-678-9012', 'Davis', 'CA', '95618', 'he/him', NOW(), NOW()),
    ('auth0|participant2', 'Lisa Garcia', 'lisa.g@example.com', '555-789-0123', 'Woodland', 'CA', '95695', 'she/her', NOW(), NOW()),
    ('auth0|participant3', 'James Wilson', 'james.w@example.com', '555-890-1234', 'West Sacramento', 'CA', '95691', 'he/him', NOW(), NOW());

-- Insert sample trainings
INSERT INTO trainings (title, description, category, start_date, end_date, location, max_participants, instructor, duration_hours, status, created_at, updated_at)
VALUES
    ('Peer-to-Peer Basics', 'Foundational training for the NAMI Peer-to-Peer education program.', 'Core', '2025-03-10', '2025-03-15', 'NAMI Yolo Office', 15, 'Admin User', 8, 'completed', NOW(), NOW()),
    ('Crisis Intervention', 'Advanced training for handling mental health crisis situations.', 'Advanced', '2025-04-20', '2025-04-25', 'Davis Community Center', 12, 'Admin User', 12, 'in-progress', NOW(), NOW()),
    ('Family-to-Family Program', 'Educational program for family members of individuals with mental health conditions.', 'Specialized', '2025-05-10', '2025-05-20', 'Woodland Library', 20, 'Admin User', 16, 'scheduled', NOW(), NOW()),
    ('Community Outreach Skills', 'Training for effective community outreach and advocacy.', 'Advanced', '2025-06-05', '2025-06-07', 'West Sacramento Community Center', 25, 'Admin User', 6, 'scheduled', NOW(), NOW()),
    ('Crisis Intervention Advanced', 'Follow-up training to the basic crisis intervention course.', 'Advanced', '2025-04-30', '2025-05-02', 'NAMI Yolo Office', 10, 'Admin User', 8, 'scheduled', NOW(), NOW()),
    ('Peer Support Refresher', 'Refresher course for certified peer support specialists.', 'Continuing Education', '2025-05-15', '2025-05-15', 'Online (Zoom)', 30, 'Admin User', 2, 'scheduled', NOW(), NOW());

-- Insert sample volunteer training enrollments
INSERT INTO volunteer_trainings (volunteer_id, training_id, status, progress, enrollment_date, completion_date, created_at, updated_at)
VALUES
    (1, 1, 'completed', 100, '2025-03-01', '2025-03-15', NOW(), NOW()),
    (1, 2, 'in-progress', 60, '2025-04-15', NULL, NOW(), NOW()),
    (3, 1, 'completed', 100, '2025-03-01', '2025-03-15', NOW(), NOW()),
    (3, 4, 'not-started', 0, '2025-05-20', NULL, NOW(), NOW()),
    (4, 2, 'completed', 100, '2025-04-15', '2025-04-25', NOW(), NOW()),
    (5, 1, 'waitlisted', 0, '2025-04-30', NULL, NOW(), NOW());

-- Insert sample events
INSERT INTO events (title, description, category, date, start_time, end_time, location, type, required_volunteers, max_participants, status, created_at, updated_at)
VALUES
    ('Peer Support Group', 'Weekly support group for individuals living with mental health conditions.', 'Support Group', '2025-04-25', '18:00', '20:00', 'Davis Community Center', 'public', 3, 20, 'scheduled', NOW(), NOW()),
    ('Family-to-Family Workshop', 'Educational program for family members, partners and friends of individuals with mental health conditions.', 'Workshop', '2025-04-28', '10:00', '14:00', 'Woodland Library', 'public', 4, 15, 'scheduled', NOW(), NOW()),
    ('Mental Health Awareness Presentation', 'Educational presentation about mental health awareness and stigma reduction.', 'Presentation', '2025-05-02', '13:00', '15:00', 'UC Davis Campus', 'public', 2, 50, 'scheduled', NOW(), NOW()),
    ('Community Mental Health Fair', 'Community event featuring resources, activities, and information about mental health services.', 'Community Event', '2025-05-15', '10:00', '16:00', 'Central Park, Davis', 'public', 5, 100, 'scheduled', NOW(), NOW()),
    ('Volunteer Training Session', 'Training session for new volunteers.', 'Training', '2025-05-05', '18:00', '21:00', 'NAMI Yolo Office', 'volunteers', 2, 10, 'scheduled', NOW(), NOW()),
    ('Mindfulness and Mental Health', 'Learn mindfulness techniques to improve mental wellbeing and reduce stress.', 'Presentation', '2025-05-10', '11:00', '12:30', 'Online (Zoom)', 'public', 1, 30, 'scheduled', NOW(), NOW());

-- Insert sample event volunteer assignments
INSERT INTO event_volunteers (event_id, volunteer_id, role, status, created_at, updated_at)
VALUES
    (1, 1, 'facilitator', 'assigned', NOW(), NOW()),
    (1, 3, 'assistant', 'assigned', NOW(), NOW()),
    (2, 3, 'facilitator', 'assigned', NOW(), NOW());

-- Insert sample participant event registrations
INSERT INTO participant_events (event_id, participant_id, status, created_at, updated_at)
VALUES
    (1, 1, 'registered', NOW(), NOW()),
    (1, 2, 'registered', NOW(), NOW()),
    (2, 2, 'registered', NOW(), NOW()),
    (6, 1, 'registered', NOW(), NOW());

-- Insert sample volunteer availability
INSERT INTO volunteer_availability (volunteer_id, day_of_week, start_time, end_time, created_at, updated_at)
VALUES
    (1, 1, '18:00', '21:00', NOW(), NOW()),
    (1, 3, '18:00', '21:00', NOW(), NOW()),
    (1, 5, '10:00', '16:00', NOW(), NOW()),
    (1, 6, '10:00', '16:00', NOW(), NOW()),
    (3, 2, '09:00', '12:00', NOW(), NOW()),
    (3, 4, '09:00', '12:00', NOW(), NOW()),
    (3, 6, '14:00', '18:00', NOW(), NOW()),
    (4, 1, '12:00', '17:00', NOW(), NOW()),
    (4, 3, '12:00', '17:00', NOW(), NOW()),
    (4, 5, '12:00', '17:00', NOW(), NOW());

-- Insert sample resources
INSERT INTO resources (title, description, category, type, url, created_at, updated_at)
VALUES
    ('NAMI Basics: Mental Health Education', 'Educational resource about mental health basics for families.', 'Education', 'pdf', '/resources/nami-basics.pdf', NOW(), NOW()),
    ('Understanding Depression', 'Information about depression symptoms, causes, and treatment options.', 'Health Information', 'article', '/resources/understanding-depression.html', NOW(), NOW()),
    ('Coping Strategies for Anxiety', 'Video tutorial on coping strategies for anxiety.', 'Self-Help', 'video', '/resources/anxiety-coping-video.html', NOW(), NOW()),
    ('Local Mental Health Services Directory', 'Directory of mental health services available in Yolo County.', 'Community Resources', 'pdf', '/resources/local-services-directory.pdf', NOW(), NOW()),
    ('Medication Management Guide', 'Guide to understanding and managing medications for mental health conditions.', 'Health Information', 'pdf', '/resources/medication-guide.pdf', NOW(), NOW()),
    ('Supporting a Loved One with Mental Illness', 'Tips for family members and friends on how to support someone with mental illness.', 'Support', 'article', '/resources/supporting-loved-ones.html', NOW(), NOW());