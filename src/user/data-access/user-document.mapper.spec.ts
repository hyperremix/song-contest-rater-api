import { defaultUser } from '@hyperremix/song-contest-rater-model';
import { defaultUserDocument } from './user-document';
import { UserDocumentMapper } from './user-document.mapper';

describe('UserDocumentMapper', () => {
  let userDocumentMapper: UserDocumentMapper;

  beforeEach(() => {
    userDocumentMapper = new UserDocumentMapper();
  });

  describe('when mapping forwards', () => {
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
  });

  describe('when mapping backwards', () => {
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
  });
});
