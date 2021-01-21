import { defaultUser } from '@hyperremix/song-contest-rater-model';
import { Builder } from 'builder-pattern';
import createHttpError from 'http-errors';
import md5 from 'md5';
import 'reflect-metadata';
import getUuidByString from 'uuid-by-string';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;

  let userRepository: any;
  let s3Client: any;

  const users = [defaultUser, Builder(defaultUser).id('othereid').build()];
  const signedUrl = 'signedUrl';
  const headObject = { Metadata: { userid: defaultUser.id } };

  beforeEach(() => {
    userRepository = {
      insert: jest.fn(() => Promise.resolve(defaultUser)),
      list: jest.fn(() => Promise.resolve(users)),
      get: jest.fn(() => Promise.resolve(defaultUser)),
      update: jest.fn(() => Promise.resolve(defaultUser)),
      delete: jest.fn(() => Promise.resolve(defaultUser)),
    };
    s3Client = {
      getSignedPutObjectUrl: jest.fn(() => Promise.resolve(signedUrl)),
      headObject: jest.fn(() => Promise.resolve(headObject)),
    };

    userController = new UserController(userRepository, s3Client);
  });

  describe('when creating', () => {
    it('then the user is inserted into the repository', async () => {
      // arrange
      const expectedUser = Builder(defaultUser)
        .id(getUuidByString(defaultUser.email))
        .gravatarUrl(`https://s.gravatar.com/avatar/${md5(defaultUser.email)}`);

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
      const result = await userController.get(defaultUser.id);

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
      const result = await userController.delete(defaultUser.id);

      // arrange
      expect(result).toEqual(defaultUser);
    });
  });

  describe('when initiating avatar uload', () => {
    it('if the user is not found then an error is thrown', async () => {
      // arrange
      userRepository.get.mockReturnValue(Promise.reject('error'));

      // act
      const act = userController.initiateAvatarUpload(defaultUser.id, 'image/jpeg');

      // assert
      await expect(act).rejects.toEqual('error');
    });

    it('if content type is invalid then a bad request error is thrown', async () => {
      // act
      const act = userController.initiateAvatarUpload(defaultUser.id, 'image/gif');

      // assert
      await expect(act).rejects.toBeInstanceOf(createHttpError.BadRequest);
    });

    it('if content type is valid then a signed url is returned', async () => {
      // act
      const result = await userController.initiateAvatarUpload(defaultUser.id, 'image/jpeg');

      // assert
      expect(result.signedUrl).toEqual('signedUrl');
    });
  });

  describe('when processing uploaded avatar', () => {
    it('if s3 object does not contain meta data then an error is thronw', async () => {
      // arrange
      s3Client.headObject.mockReturnValue({});

      // act
      const act = userController.processUploadedAvatar('bucketName', 'objectKey');

      // act
      await expect(act).rejects.toEqual(
        new Error('Cannot process avatar objectKey in bucket bucketName as it has no metadata')
      );
    });

    it('if the user is not found then an error is thrown', async () => {
      // arrange
      userRepository.get.mockReturnValue(Promise.reject('error'));

      // act
      const act = userController.processUploadedAvatar('bucketName', 'objectKey');

      // assert
      await expect(act).rejects.toEqual('error');
    });

    it('if the user exists then its avatar is updated', async () => {
      // arrange
      const userWithAvatar = {
        ...defaultUser,
        avatarUrl: 'https://bucketName.s3.eu-central-1.amazonaws.com/objectKey',
      };

      // act
      await userController.processUploadedAvatar('bucketName', 'objectKey');

      // assert
      expect(userRepository.update).toHaveBeenCalledWith(userWithAvatar);
    });
  });
});
