CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user'
);

CREATE TABLE Students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
	date_of_birth DATE NOT NULL,
    created_by_user_id INT NOT NULL,
    FOREIGN KEY (created_by_user_id) REFERENCES users (user_id) ON DELETE SET NULL
);

CREATE TABLE Exams (
    exam_id SERIAL PRIMARY KEY,
    subject VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    total_marks INT NOT NULL CHECK (total_marks > 0),
    created_by_user_id INT,
    FOREIGN KEY (created_by_user_id) REFERENCES users (user_id) ON DELETE SET NULL
);

CREATE TABLE Results (
    result_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    exam_id INT NOT NULL,
    marks_obtained INT NOT NULL CHECK (marks_obtained >= 0),
    recorded_by_user_id INT,
    FOREIGN KEY (student_id) REFERENCES Students (student_id) ON DELETE CASCADE,
    FOREIGN KEY (exam_id) REFERENCES Exams (exam_id) ON DELETE CASCADE,
    FOREIGN KEY (recorded_by_user_id) REFERENCES users (user_id) ON DELETE SET NULL,
    UNIQUE (student_id, exam_id)
);