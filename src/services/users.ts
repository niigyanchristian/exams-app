import pool from "../config/db";

interface User {
    user_id?: string;
    username: string;
    hashedPassword?: string,
    password?: any,
    role?: string;
}
export const registerQuery = async ({ username, hashedPassword, role }: User): Promise<User> => {
    const result = await pool.query(
        'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING user_id,username,role',
        [username, hashedPassword, role || 'user']
    );

    return result.rows[0];

}


export const loginQuery = async ({ username }: User): Promise<User> => {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    return result.rows[0];

}

export const findUser = async ({ username }: User): Promise<User> => {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    return result.rows[0];

}