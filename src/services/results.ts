import pool from "../config/db";

interface ResultData {
    result_id?: number;
    student_id: number;
    exam_id: number;
    marks_obtained: number;
    recorded_by_user_id?: number;
}
export const createResultQuery = async ({ student_id, exam_id, marks_obtained, recorded_by_user_id }: ResultData): Promise<ResultData> => {
    const result = await pool.query(
        'INSERT INTO Results (student_id, exam_id, marks_obtained, recorded_by_user_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [student_id, exam_id, marks_obtained, recorded_by_user_id]
    );

    return result.rows[0];
}


export const fetchResultsQuery = async (): Promise<ResultData[]> => {

    const result = await pool.query('SELECT * FROM Results');

    return result.rows;
}

export const fetchResultByIDQuery = async ({ id }: { id: number }):
    Promise<ResultData[]> => {

    const result = await pool.query('SELECT * FROM results WHERE result_id = $1', [id]);

    if (result.rows.length === 0) {
        throw new Error('Result not found');
    } else {
        return result.rows[0];

    }
}
export const findResult = async ({ student_id, exam_id, }: { student_id: number, exam_id: number, }):
    Promise<ResultData[]> => {

    const result = await pool.query('SELECT * FROM results WHERE student_id = $1 AND exam_id = $2', [student_id, exam_id,]);

    return result.rows[0];

}

export const updateResultQuery = async ({ marks_obtained, id }:
    { marks_obtained: number, id: number }): Promise<ResultData> => {

    const result = await pool.query(
        'UPDATE Results SET marks_obtained = $1 WHERE result_id = $2 RETURNING *',
        [marks_obtained, id]
    );

    return result.rows[0];
}


export const deleteResultQuery = async ({ id }: { id: string }): Promise<ResultData> => {
    const result = await pool.query('DELETE FROM results WHERE result_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
        throw new Error('Result not found');
    } else {
        return result.rows[0];
    }
}