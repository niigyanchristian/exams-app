import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUser, loginQuery, registerQuery } from '../services/users';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { username, password, role } = req.body;
    try {
        const user = await findUser({ username });
        if (user) throw new Error("User already exist!");

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await registerQuery({ username, hashedPassword, role })

        res.status(201).json({ message: 'User registered successfully', user: result });
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { username, password } = req.body;
    try {
        const result = await loginQuery({ username });
        const user = result;
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign({ userId: user.user_id, role: user.role }, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        next(error);
    }
};
