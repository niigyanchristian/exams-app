import pool from "../config/db";

interface ExamData {
    exam_id?: number;
    subject: string;
    date: string;
    total_marks: number;
    created_by_user_id?: number;
}
export const createExamQuery = async ({ subject, date, total_marks, created_by_user_id }: ExamData): Promise<ExamData> => {
    const result = await pool.query(
        'INSERT INTO Exams (subject, date, total_marks) VALUES ($1, $2, $3, $4) RETURNING *',
        [subject, date, total_marks, created_by_user_id]
    );

    return result.rows[0];
}


export const fetchExamsQuery = async (): Promise<ExamData[]> => {

    const result = await pool.query('SELECT * FROM Exams');

    return result.rows;
}

export const fetchExamByIDQuery = async ({ id }: { id: string }):
    Promise<ExamData[]> => {

    const result = await pool.query('SELECT * FROM Exams WHERE exam_id = $1', [id]);

    if (result.rows.length === 0) {
        throw new Error('Student not found');
    } else {
        return result.rows[0];

    }
}

export const updateExamQuery = async ({ exam_id, subject, date, total_marks }:
    ExamData): Promise<ExamData> => {

    const result = await pool.query(
        'UPDATE exams SET subject = $1, date = $2, total_marks = $3 WHERE exam_id = $4 RETURNING *',
        [subject, date, total_marks, exam_id]
    );

    return result.rows[0];
}


export const deleteExamQuery = async ({ id }: { id: string }): Promise<ExamData> => {
    const result = await pool.query('DELETE FROM Exams WHERE exam_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
        throw new Error('Student not found');
    } else {
        return result.rows[0];
    }
}