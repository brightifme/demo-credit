import express, { Router,Request, Response } from 'express';
import UserService from '../services/user.service';

const usersRouter = Router();

usersRouter.post('/', async (req: Request, res: Response) => {
  try {
    const userService = new UserService();
    const result = await userService.createUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

export default usersRouter;