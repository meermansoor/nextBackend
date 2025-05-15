import express from 'express';
import { register, login , forgotPassword , changePassword } from '../controllers/auth.controller.js';

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.put('/forgot-password', forgotPassword);
router.put('/:userId/change-password', changePassword);

export default router; 