import { isAdminUser } from './admin-user.validator';

describe('AdminUserValidator', () => {
  describe('when checking is admin user', () => {
    it('if claims is undefined then false is returned', () => {
      // act
      const result = isAdminUser({});

      // assert
      expect(result).toBe(false);
    });

    it('if claims does not contain cognito:groups then false is returned', () => {
      // act
      const result = isAdminUser({ claims: { foo: 'bar' } });

      // assert
      expect(result).toBe(false);
    });

    it('if cognito:groups claim is not a string array then false is returned', () => {
      // act
      const result = isAdminUser({ claims: { 'cognito:groups': 1 } });

      // assert
      expect(result).toBe(false);
    });

    it('if cognito:groups claim does not contain admin then false is returned', () => {
      // act
      const result = isAdminUser({ claims: { 'cognito:groups': ['otherGroup'] } });

      // assert
      expect(result).toBe(false);
    });

    it('if cognito:groups claim contains admin then true is returned', () => {
      // act
      const result = isAdminUser({ claims: { 'cognito:groups': ['Admin'] } });

      // assert
      expect(result).toBe(true);
    });
  });
});
