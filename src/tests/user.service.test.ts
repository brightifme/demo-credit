import UserService from '../services/user.service';
import db from '../database/database';

jest.mock('../database/database');

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user successfully', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      phoneNumber: '1234567890',
      password: 'password123',
    };

    const mockedDb = db as jest.Mocked<typeof db>;
    mockedDb.where.mockResolvedValueOnce([]);
    mockedDb.insert.mockResolvedValueOnce([1]);

    const userService = new UserService();
    const result = await userService.createUser(userData);

    expect(result).toEqual({ message: 'User has been created' });
    expect(mockedDb.where).toHaveBeenCalledTimes(1);
    expect(mockedDb.insert).toHaveBeenCalledTimes(2);
  });

});