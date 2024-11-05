import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createResultQuery, deleteResultQuery, fetchResultByIDQuery, fetchResultsQuery, findResult, updateResultQuery } from '../services/results';
import { fetchStudentByIDQuery } from '../services/students';
import { fetchExamByIDQuery } from '../services/exams';

export const createResult = async (req: any, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { student_id, exam_id, marks_obtained } = req.body;
    try {
        await fetchStudentByIDQuery({ id: student_id });
        await fetchExamByIDQuery({ id: exam_id });

        const checkResult = await findResult({ student_id, exam_id });
        if (checkResult) throw new Error("Result already exist!");

        const result = await createResultQuery({ student_id, exam_id, marks_obtained, recorded_by_user_id: req.user.userId });

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const getResults = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await fetchResultsQuery();

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getResultById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
        res.status(400).json({ error: "Invalid ID format. ID must be a number." });
        return;
    }

    try {
        const result = await fetchResultByIDQuery({ id: parseInt(id) });

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const updateResult = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { id } = req.params;
    const { marks_obtained } = req.body;

    if (isNaN(parseInt(id))) {
        res.status(400).json({ error: "Invalid ID format. ID must be a number." });
        return;
    }

    try {

        await fetchResultByIDQuery({ id: parseInt(id) })

        const result = await updateResultQuery({ marks_obtained, id: parseInt(id) });

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const deleteResult = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
        res.status(400).json({ error: "Invalid ID format. ID must be a number." });
        return;
    }

    try {
        await fetchResultByIDQuery({ id: parseInt(id) });

        const result = await deleteResultQuery({ id });

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
