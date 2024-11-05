import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createStudentQuery, deleteStudentQuery, fetchStudentByIDQuery, fetchStudentsQuery, findStudent, updateStudentQuery } from '../services/students';
import { AuthRequest } from '../types/interfaces';


export const createStudent = async (req: AuthRequest, res: Response, next: NextFunction) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { first_name, last_name, email, date_of_birth } = req.body;

    try {
        const student = await findStudent({ email });
        if (student) throw new Error("Student with same email already exist!");

        const result = await createStudentQuery({ first_name, last_name, email, date_of_birth, created_by_user_id: req.user?.userId });

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};


export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await fetchStudentsQuery();

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};


export const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
        res.status(400).json({ error: "Invalid ID format. ID must be a number." });
        return;
    }

    try {
        const result = await fetchStudentByIDQuery({ id: parseInt(id) });

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};


export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const { id } = req.params;
    const { first_name, last_name, email, date_of_birth } = req.body;

    if (isNaN(parseInt(id))) {
        res.status(400).json({ error: "Invalid ID format. ID must be a number." });
        return;
    }

    try {
        await fetchStudentByIDQuery({ id: parseInt(id) });

        const result = await updateStudentQuery({ student_id: parseInt(id), first_name, last_name, email, date_of_birth })

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};


export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
        res.status(400).json({ error: "Invalid ID format. ID must be a number." });
        return;
    }

    try {
        await fetchStudentByIDQuery({ id: parseInt(id) });

        const result = await deleteStudentQuery({ id });

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
