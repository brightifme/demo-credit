import db from '../database/database';

interface FundAccountParams {
  userId: number;
  amount: number;
}

class AccountService {
  async fundAccount(userData: FundAccountParams) {
    try {
      const user = await db('users').where('id', userData.userId).first();
      if (!user) {
        throw new Error('User not found');
      }

      await db('accounts').where('userId', userData.userId).increment('balance', userData.amount);

      return { message: 'Account funded successfully' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fund account: ${error.message}`);
      } else {
        throw new Error(`Failed to fund account: Unknown error`);
      }
    }
  }
}

export default AccountService;