import { defaultUser } from '@hyperremix/song-contest-rater-model';
import { Builder } from 'builder-pattern';
import 'reflect-metadata';
import getUuidByString from 'uuid-by-string';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;

  let userRepository: any;

  const users = [defaultUser, Builder(defaultUser).id('othereid').build()];

  beforeEach(() => {
    userRepository = {
      insert: jest.fn(() => Promise.resolve(defaultUser)),
      list: jest.fn(() => Promise.resolve(users)),
      get: jest.fn(() => Promise.resolve(defaultUser)),
      update: jest.fn(() => Promise.resolve(defaultUser)),
      delete: jest.fn(() => Promise.resolve(defaultUser)),
    };

    userController = new UserController(userRepository);
  });

  describe('when creating', () => {
    it('then the user is inserted into the repository', async () => {
      // arrange
      const expectedUser = { ...defaultUser, id: getUuidByString(defaultUser.email) };

      // act
      await userController.create(defaultUser);

      // arrange
      expect(userRepository.insert).toHaveBeenCalledWith(expectedUser);
    });

    it('then the user is returned', async () => {
      // act
      const result = await userController.create(defaultUser);

      // arrange
      expect(result).toBe(defaultUser);
    });
  });

  describe('when listing', () => {
    it('then users are returned from the repository', async () => {
      // act
      const result = await userController.list();

      // arrange
      expect(result).toEqual(users);
    });
  });

  describe('when getting', () => {
    it('then the user is returned from the repository', async () => {
      // act
      const result = await userController.get(defaultUser.email);

      // arrange
      expect(result).toEqual(defaultUser);
    });
  });

  describe('when updating', () => {
    it('then the user is updated in the repository', async () => {
      // act
      await userController.update(defaultUser);

      // arrange
      expect(userRepository.update).toHaveBeenCalled();
    });

    it('then the user is returned', async () => {
      // act
      const result = await userController.update(defaultUser);

      // arrange
      expect(result).toBe(defaultUser);
    });
  });

  describe('when deleting', () => {
    it('then the deleted user is returned from the repository', async () => {
      // act
      const result = await userController.delete(defaultUser.email);

      // arrange
      expect(result).toEqual(defaultUser);
    });
  });
});
