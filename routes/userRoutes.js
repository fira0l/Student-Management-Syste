import express from 'express';
import { createUser ,registerUser, loginUser, getUsers, deleteUser, updateUser } from '../controllers/userController.js';

const router = express.Router();


router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

export default router;
