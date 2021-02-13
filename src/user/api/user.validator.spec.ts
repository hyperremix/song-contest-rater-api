import { isCorrectUser } from './user.validator';

describe('UserValidator', () => {
  describe('when checking is correct user', () => {
    it('if claims is undefined then false is returned', () => {
      // act
      const result = isCorrectUser({}, { id: 'id' });

      // assert
      expect(result).toBe(false);
    });

    it('if claims does not contain email then false is returned', () => {
      // act
      const result = isCorrectUser({ claims: { foo: 'bar' } }, { id: 'id' });

      // assert
      expect(result).toBe(false);
    });

    it('if email claim is not a string then false is returned', () => {
      // act
      const result = isCorrectUser({ claims: { email: 1 } }, { id: 'id' });

      // assert
      expect(result).toBe(false);
    });

    it('if id is undefined then false is returned', () => {
      // act
      const result = isCorrectUser({ claims: { email: 'email' } }, {});

      // assert
      expect(result).toBe(false);
    });

    it('if email does not resolve to id then false is returned', () => {
      // act
      const result = isCorrectUser({ claims: { email: 'email' } }, { id: 'id' });

      // assert
      expect(result).toBe(false);
    });

    it('if email resolves to id then true is returned', () => {
      // act
      const result = isCorrectUser(
        { claims: { email: 'email' } },
        { id: 'a88b7dcd-1a9e-5e17-b70b-baa6d7515b31' }
      );

      // assert
      expect(result).toBe(true);
    });
  });
});
