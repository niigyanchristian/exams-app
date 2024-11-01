import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createStudentQuery, deleteStudentQuery, fetchStudentByIDQuery, fetchStudentsQuery, updateStudentQuery } from '../services/students';

export const createStudent = async (req: any, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { first_name, last_name, email, date_of_birth } = req.body;
    try {

        const result = await createStudentQuery({ first_name, last_name, email, date_of_birth, created_by_user_id: req.user.userId });

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


export const getStudents = async (req: Request, res: Response) => {
    try {
        const result = await fetchStudentsQuery();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


export const getStudentById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await fetchStudentByIDQuery({ id });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


export const updateStudent = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const { id } = req.params;
    const { first_name, last_name, email, date_of_birth } = req.body;
    try {
        const result = await updateStudentQuery({ student_id: parseInt(id), first_name, last_name, email, date_of_birth })

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


export const deleteStudent = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await deleteStudentQuery({ id });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
