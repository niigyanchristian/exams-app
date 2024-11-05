import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, UserData } from '../types/interfaces';



// export interface AuthRequest extends Request {
//     user?: User;
// }


export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Access Denied: No Token Provided' });
        return
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            res.status(403).json({ message: 'Invalid Token' });
            return;
        }
        req.user = user as UserData;
        next();
    });
};

export const authorizeRole = (role: string) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (req.user?.role !== role) {
            res.status(403).json({ message: 'Access Denied: Insufficient Privileges' });
            return
        }
        next();
    };
};
