
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

    const mockedDb = jest.mocked(db);
    mockedDb.select.mockResolvedValueOnce([]);
    mockedDb.insert.mockResolvedValueOnce([1]);

    const userService = new UserService();
    const result = await userService.createUser(userData);

    expect(result).toEqual({ message: 'User has been created' });
    expect(mockedDb.select).toHaveBeenCalledTimes(1);
    expect(mockedDb.insert).toHaveBeenCalledTimes(2);
  });

  it('should throw an error if email or phone number already exists', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      phoneNumber: '1234567890',
      password: 'password123',
    };

    const mockedDb = jest.mocked(db);
    mockedDb.select.mockResolvedValueOnce([{ id: 1 }]);

    const userService = new UserService();
    await expect(userService.createUser(userData)).rejects.toThrow(
      'Email or phone number already exists',
    );

    expect(mockedDb.select).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if database query fails', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      phoneNumber: '1234567890',
      password: 'password123',
    };

    const mockedDb = jest.mocked(db);
    mockedDb.select.mockRejectedValueOnce(new Error('Database query failed'));

    const userService = new UserService();
    await expect(userService.createUser(userData)).rejects.toThrow(
      'Failed to create user: Database query failed',
    );

    expect(mockedDb.select).toHaveBeenCalledTimes(1);
  });
});