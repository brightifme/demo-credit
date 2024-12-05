import db from '../database/database';

interface TransferFundsParams {
  senderId: number;
  recipientId: number;
  amount: number;
}

class TransferService {
  async transferFunds(userData: TransferFundsParams) {
    try {
      const trx = await db.transaction();

      const sender = await trx('users').where('id', userData.senderId).first();
      if (!sender) {
        await trx.rollback();
        throw new Error('Sender not found');
      }

      const recipient = await trx('users').where('id', userData.recipientId).first();
      if (!recipient) {
        await trx.rollback();
        throw new Error('Recipient not found');
      }

      const senderAccount = await trx('accounts').where('userId', userData.senderId).first();
      if (senderAccount.balance < userData.amount) {
        await trx.rollback();
        throw new Error('Insufficient funds');
      }

      const recipientAccount = await trx('accounts').where('userId', userData.recipientId).first();
      if (!recipientAccount) {
        await trx.rollback();
        throw new Error('Recipient account not found');
      }

      await trx('accounts').where('userId', userData.senderId).decrement('balance', userData.amount);
      await trx('accounts').where('userId', userData.recipientId).increment('balance', userData.amount);
      await trx.commit();

      return { message: 'Funds transferred successfully' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to transfer funds: ${error.message}`);
      } else {
        throw new Error(`Failed to transfer funds: Unknown error`);
      }
    }
  }
}

export default TransferService;
