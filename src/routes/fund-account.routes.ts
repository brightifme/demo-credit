import express, {Router, Request, Response } from 'express';
import AccountService from '../services/account.service';

const fundAccountRouter = Router();

fundAccountRouter.post('/', async (req: Request, res: Response) => {
  try {
    const accountService = new AccountService();
    const result = await accountService.fundAccount(req.body);
    res.status(200).json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error funding account:', error);
      res.status(500).json({ message: error.message });
    } else {
      console.error('Error funding account:', error);
      res.status(500).json({ message: 'Unknown error' });
    }
  }
});

export default fundAccountRouter;