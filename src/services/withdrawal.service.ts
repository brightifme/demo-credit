import db from "../database/database";

interface WithdrawFundsParams {
  userId: number;
  amount: number;
}

class WithdrawalService {
  async withdrawFunds(userData: WithdrawFundsParams) {
    try {
      const trx = await db.transaction();

      const user = await trx('users').where('id', userData.userId).first();
      if (!user) {
        await trx.rollback();
        throw new Error('User not found');
      }

      const account = await trx('accounts').where('userId', userData.userId).first();
      if (account.balance < userData.amount) {
        await trx.rollback();
        throw new Error('Insufficient funds');
      }

      await trx('accounts').where('userId', userData.userId).decrement('balance', userData.amount);
      await trx.commit();

      return { message: 'Funds withdrawn successfully' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to withdraw funds: ${error.message}`);
      } else {
        throw new Error(`Failed to withdraw funds: Unknown error`);
      }
    }
  }
}

export default WithdrawalService;
