import db from '../database/database';

interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

class UserService {
  async createUser(userData: CreateUserParams) {
    try {
      const existingUser = await db('users')
        .where('email', userData.email)
        .orWhere('phoneNumber', userData.phoneNumber)
        .first();

      if (existingUser) {
        throw new Error('Email or phone number already exists');
      }

      const [id] = await db('users').insert(userData);
      await db('accounts').insert({ userId: id, balance: 0.00 });

      return { message: 'User has been created' };
    } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`Failed to create user: ${error.message}`);
        } else {
          throw new Error(`Failed to create user: Unknown error`);
   
  }
}
}
}
export default UserService;