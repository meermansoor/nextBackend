import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            const error = new Error('Authentication required');
            error.status = 401;
            throw error;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            error.status = 401;
            error.message = 'Invalid token';
        }
        next(error);
    }
};

export const authorizeAdmin = (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            const error = new Error('Admin access required');
            error.status = 403;
            throw error;
        }
        next();
    } catch (error) {
        next(error);
    }
};

export const authorizeUser = (req, res, next) => {
    try {
        if (req.user.role !== 'user' && req.user.role !== 'admin') {
            const error = new Error('User access required');
            error.status = 403;
            throw error;
        }
        next();
    } catch (error) {
        next(error);
    }
};
