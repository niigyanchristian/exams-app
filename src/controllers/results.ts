import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createResultQuery, deleteResultQuery, fetchResultByIDQuery, fetchResultsQuery, updateResultQuery } from '../services/results';

export const createResult = async (req: any, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { student_id, exam_id, marks_obtained } = req.body;
    try {
        const result = await createResultQuery({ student_id, exam_id, marks_obtained, recorded_by_user_id: req.user.userId });

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getResults = async (req: Request, res: Response) => {
    try {
        const result = await fetchResultsQuery();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getResultById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await fetchResultByIDQuery({ id });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const updateResult = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { id } = req.params;
    const { marks_obtained } = req.body;
    try {
        const result = await updateResultQuery({ marks_obtained, id: parseInt(id) });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteResult = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await deleteResultQuery({ id });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
