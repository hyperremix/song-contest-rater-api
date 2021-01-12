import { defaultUser } from '@hyperremix/song-contest-rater-model';
import { Builder } from 'builder-pattern';
import { defaultUserDocument } from './user-document';
import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  let databaseClient: any;
  let mapper: any;

  beforeEach(() => {
    databaseClient = {
      scan: jest.fn(() => Promise.resolve([defaultUserDocument])),
      put: jest.fn(() => Promise.resolve(defaultUserDocument)),
      get: jest.fn(() => Promise.resolve(defaultUserDocument)),
      update: jest.fn(() => Promise.resolve(defaultUserDocument)),
      delete: jest.fn(() => Promise.resolve(defaultUserDocument)),
    };

    mapper = {
      mapForwards: jest.fn(() => [defaultUserDocument]),
      mapBackwards: jest.fn(() => defaultUser),
      mapManyBackwards: jest.fn(() => [defaultUser]),
    };

    userRepository = new UserRepository(databaseClient, mapper);
  });

  describe('when inserting', () => {
    it('then the user is mapped', async () => {
      // act
      await userRepository.insert(defaultUser);

      // assert
      expect(mapper.mapForwards).toHaveBeenCalledWith(defaultUser);
    });

    it('then the user document is mapped', async () => {
      // act
      await userRepository.insert(defaultUser);

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultUserDocument);
    });

    it('then the user document is returned', async () => {
      // act
      const result = await userRepository.insert(defaultUser);

      // assert
      expect(result).toBe(defaultUser);
    });
  });

  describe('when scanning', () => {
    it('then user documents are mapped', async () => {
      // act
      await userRepository.list();

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultUserDocument);
    });

    it('then a list of users is returned', async () => {
      // arrange
      const extraUserDocument = Builder(defaultUserDocument).id('otherid').build();
      const extraUser = Builder(defaultUser).id('otherid').build();

      databaseClient.scan.mockReturnValue(
        Promise.resolve([defaultUserDocument, extraUserDocument])
      );
      mapper.mapBackwards.mockReturnValueOnce(defaultUser).mockReturnValueOnce(extraUser);

      // act
      const result = await userRepository.list();

      // assert
      expect(result).toEqual([defaultUser, extraUser]);
    });
  });

  describe('when getting', () => {
    it('then the user document is mapped', async () => {
      // act
      await userRepository.get(defaultUser.id);

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultUserDocument);
    });

    it('then the user is returned', async () => {
      // act
      const result = await userRepository.get(defaultUser.id);

      // assert
      expect(result).toBe(defaultUser);
    });
  });

  describe('when updating', () => {
    it('then the user is mapped', async () => {
      // act
      await userRepository.update(defaultUser);

      // assert
      expect(mapper.mapForwards).toHaveBeenCalledWith(defaultUser);
    });

    it('then the user document is mapped', async () => {
      // act
      await userRepository.update(defaultUser);

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultUserDocument);
    });

    it('then the user is returned', async () => {
      // act
      const result = await userRepository.get(defaultUserDocument.id);

      // assert
      expect(result).toBe(defaultUser);
    });
  });

  describe('when deleting', () => {
    it('then the user document is mapped', async () => {
      // act
      await userRepository.delete(defaultUser.id);

      // assert
      expect(mapper.mapBackwards).toHaveBeenCalledWith(defaultUserDocument);
    });

    it('then the deleted user is returned', async () => {
      // act
      const result = await userRepository.delete(defaultUser.id);

      // assert
      expect(result).toBe(defaultUser);
    });
  });
});
