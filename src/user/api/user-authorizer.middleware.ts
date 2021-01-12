import createError from 'http-errors';
import getUuidByString from 'uuid-by-string';

const IS_OFFLINE = process.env.IS_OFFLINE;

export const userAuthorizer = () => {
  return {
    before: (handler, next) => {
      if (IS_OFFLINE) {
        next();
        return;
      }

      const authorizer = handler.event.requestContext?.authorizer;
      if (!authorizer) {
        throw new createError.Unauthorized('Unauthorized');
      }

      const userEmail = authorizer.claims?.['email'];
      if (!userEmail) {
        throw new createError.Forbidden('Token does not contain the required field "email"');
      }

      const userId = handler.event.pathParameters?.id;
      if (!userId) {
        throw new createError.NotFound();
      }

      if (userId !== getUuidByString(userEmail)) {
        throw new createError.Forbidden('You are not allowed to read or write someone elses data');
      }

      next();
    },
  };
};
