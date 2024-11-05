import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createExamQuery, deleteExamQuery, fetchExamByIDQuery, fetchExamsQuery, findExams, updateExamQuery } from '../services/exams';


export const createExam = async (req: any, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { subject, date, total_marks } = req.body;
    try {
        const exams = await findExams({ subject });
        if (exams) throw new Error("Exams with same subject already exist!");

        const result = await createExamQuery({ subject, date, total_marks, created_by_user_id: req.user.userId });

        res.status(201).json(result);
    } catch (error) {
        next(error)
    }
};

export const getExams = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await fetchExamsQuery();

        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
};

export const getExamById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
        res.status(400).json({ error: "Invalid ID format. ID must be a number." });
        return;
    }

    try {
        const result = await fetchExamByIDQuery({ id: parseInt(id) });

        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
};

export const updateExam = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { id } = req.params;
    const { subject, date, total_marks } = req.body;

    if (isNaN(parseInt(id))) {
        res.status(400).json({ error: "Invalid ID format. ID must be a number." });
        return;
    }

    try {
        await fetchExamByIDQuery({ id: parseInt(id) });

        const result = await updateExamQuery({ exam_id: parseInt(id), subject, date, total_marks });

        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
};

export const deleteExam = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
        res.status(400).json({ error: "Invalid ID format. ID must be a number." });
        return
    }
    try {
        await fetchExamByIDQuery({ id: parseInt(id) });

        const result = await deleteExamQuery({ id });

        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
};
