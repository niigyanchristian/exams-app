import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createExamQuery, deleteExamQuery, fetchExamByIDQuery, fetchExamsQuery, updateExamQuery } from '../services/exams';


export const createExam = async (req: any, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { subject, date, total_marks } = req.body;
    try {
        const result = await createExamQuery({ subject, date, total_marks, created_by_user_id: req.user.userId });

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getExams = async (req: Request, res: Response) => {
    try {
        const result = await fetchExamsQuery();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getExamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await fetchExamByIDQuery({ id });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const updateExam = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { id } = req.params;
    const { subject, date, total_marks } = req.body;
    try {
        const result = await updateExamQuery({ exam_id: parseInt(id), subject, date, total_marks });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteExam = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await deleteExamQuery({ id });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
