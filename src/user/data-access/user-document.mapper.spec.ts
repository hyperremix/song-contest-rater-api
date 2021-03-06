import { defaultUser } from '@hyperremix/song-contest-rater-model';
import { defaultUserDocument } from './user-document';
import { UserDocumentMapper } from './user-document.mapper';

describe('UserDocumentMapper', () => {
  let userDocumentMapper: UserDocumentMapper;

  beforeEach(() => {
    userDocumentMapper = new UserDocumentMapper();
  });

  describe('when mapping forwards', () => {
    it('then id is set', () => {
      // act
      const result = userDocumentMapper.mapForwards(defaultUser);

      // assert
      expect(result.id).toBe(defaultUser.id);
    });

    it('then email is set', () => {
      // act
      const result = userDocumentMapper.mapForwards(defaultUser);

      // assert
      expect(result.email).toBe(defaultUser.email);
    });

    it('then firstname is set', () => {
      // act
      const result = userDocumentMapper.mapForwards(defaultUser);

      // assert
      expect(result.firstname).toBe(defaultUser.firstname);
    });

    it('then lastname is set', () => {
      // act
      const result = userDocumentMapper.mapForwards(defaultUser);

      // assert
      expect(result.lastname).toBe(defaultUser.lastname);
    });

    it('then avatarUrl is set', () => {
      // act
      const result = userDocumentMapper.mapForwards(defaultUser);

      // assert
      expect(result.avatarUrl).toBe(defaultUser.avatarUrl);
    });

    it('then gravatarUrl is set', () => {
      // act
      const result = userDocumentMapper.mapForwards(defaultUser);

      // assert
      expect(result.gravatarUrl).toBe(defaultUser.gravatarUrl);
    });

    it('then useGvatar is set', () => {
      // act
      const result = userDocumentMapper.mapForwards(defaultUser);

      // assert
      expect(result.useGravatar).toBe(defaultUser.useGravatar);
    });

    it('then ratingIds is set', () => {
      // act
      const result = userDocumentMapper.mapForwards(defaultUser);

      // assert
      expect(result.ratingIds).toBe(defaultUser.ratingIds);
    });
  });

  describe('when mapping backwards', () => {
    it('then id is set', () => {
      // act
      const result = userDocumentMapper.mapBackwards(defaultUserDocument);

      // assert
      expect(result.id).toBe(defaultUserDocument.id);
    });

    it('then email is set', () => {
      // act
      const result = userDocumentMapper.mapBackwards(defaultUserDocument);

      // assert
      expect(result.email).toBe(defaultUserDocument.email);
    });

    it('then firstname is set', () => {
      // act
      const result = userDocumentMapper.mapBackwards(defaultUserDocument);

      // assert
      expect(result.firstname).toBe(defaultUserDocument.firstname);
    });

    it('then lastname is set', () => {
      // act
      const result = userDocumentMapper.mapBackwards(defaultUserDocument);

      // assert
      expect(result.lastname).toBe(defaultUserDocument.lastname);
    });

    it('then avatarUrl is set', () => {
      // act
      const result = userDocumentMapper.mapBackwards(defaultUserDocument);

      // assert
      expect(result.avatarUrl).toBe(defaultUserDocument.avatarUrl);
    });

    it('then gravatarUrl is set', () => {
      // act
      const result = userDocumentMapper.mapBackwards(defaultUserDocument);

      // assert
      expect(result.gravatarUrl).toBe(defaultUserDocument.gravatarUrl);
    });

    it('then useGvatar is set', () => {
      // act
      const result = userDocumentMapper.mapBackwards(defaultUserDocument);

      // assert
      expect(result.useGravatar).toBe(defaultUserDocument.useGravatar);
    });

    it('then ratingIds is set', () => {
      // act
      const result = userDocumentMapper.mapBackwards(defaultUserDocument);

      // assert
      expect(result.ratingIds).toBe(defaultUserDocument.ratingIds);
    });
  });
});
