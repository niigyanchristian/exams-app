INSERT INTO users (username, password, role) VALUES 
('admin', 'hashed_password1', 'admin'),
('user1', 'hashed_password2', 'user');

INSERT INTO students (first_name, last_name, email,date_of_birth, created_by_user_id) VALUES 
('John', 'Doe', 'john.doe@example.com','2001-05-12', 1),
('Jane', 'Smith', 'jane.smith@example.com','2001-05-12', 1);

INSERT INTO exams (subject, date, total_marks, created_by_user_id) VALUES 
('Math', '2024-10-01', 100, 1),
('Science', '2024-10-05', 100, 1);

INSERT INTO results (student_id, exam_id, marks_obtained, recorded_by_user_id) VALUES 
(1, 1, 85, 1),
(2, 2, 90, 1);
