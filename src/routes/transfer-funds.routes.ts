import express, { Router, Request, Response } from 'express';
import TransferService from '../services/transfer.service';

const transferFundsRouter = Router();

transferFundsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const transferService = new TransferService();
    const result = await transferService.transferFunds(req.body);
    res.status(200).json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error transferring funds:', error);
      res.status(500).json({ message: error.message });
    } else {
      console.error('Error transferring funds:', error);
      res.status(500).json({ message: 'Unknown error' });
    }
  }
});

export default transferFundsRouter;