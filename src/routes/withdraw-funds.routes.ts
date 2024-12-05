import express, {Router, Request, Response } from 'express';
import WithdrawalService from '../services/withdrawal.service';

const withdrawFundsRouter = Router();

withdrawFundsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const withdrawalService = new WithdrawalService();
    const result = await withdrawalService.withdrawFunds(req.body);
    res.status(200).json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error withdrawing funds:', error);
      res.status(500).json({ message: error.message });
    } else {
      console.error('Error withdrawing funds:', error);
      res.status(500).json({ message: 'Unknown error' });
    }
  }
});

export default withdrawFundsRouter;