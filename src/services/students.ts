import pool from "../config/db";

interface StudentData {
    student_id?: number;
    first_name: string;
    last_name: string;
    email: string;
    date_of_birth: number;
    created_by_user_id?: number;
}

export const createStudentQuery = async ({ first_name, last_name, email, date_of_birth, created_by_user_id }:
    StudentData): Promise<StudentData> => {

    const result = await pool.query(
        'INSERT INTO Students (first_name, last_name, email, date_of_birth,created_by_user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [first_name, last_name, email, date_of_birth, created_by_user_id]
    );
    return result.rows[0];
}

export const fetchStudentsQuery = async (): Promise<StudentData[]> => {

    const result = await pool.query('SELECT * FROM Students');

    return result.rows;
}

export const fetchStudentByIDQuery = async ({ id }: { id: number }):
    Promise<StudentData[]> => {

    const result = await pool.query('SELECT * FROM Students WHERE student_id = $1', [id]);

    if (result.rows.length === 0) {
        throw new Error('Student not found!');
    } else {
        return result.rows[0];

    }
}

export const findStudent = async ({ email }: { email: string }): Promise<StudentData> => {
    const result = await pool.query('SELECT * FROM Students WHERE email = $1', [email]);

    return result.rows[0];

}

export const updateStudentQuery = async ({ student_id, first_name, last_name, email, date_of_birth }:
    StudentData): Promise<StudentData> => {

    const result = await pool.query(
        'UPDATE Students SET first_name = $1, last_name = $2, email = $3, date_of_birth = $4 WHERE student_id = $5 RETURNING *',
        [first_name, last_name, email, date_of_birth, student_id]
    );

    return result.rows[0];
}


export const deleteStudentQuery = async ({ id }: { id: string }): Promise<StudentData> => {
    const result = await pool.query('DELETE FROM Students WHERE student_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
        throw new Error('Student not found');
    } else {
        return result.rows[0];
    }
}