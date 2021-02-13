import getUuidByString from 'uuid-by-string';

export const isCorrectUser = ({ claims }: { claims?: any }, { id }: { id?: string }): boolean => {
  const userEmail = claims?.['email'];
  return !!userEmail && typeof userEmail === 'string' && !!id && id === getUuidByString(userEmail);
};
