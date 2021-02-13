import createError from 'http-errors';
import { isAdminUser } from 'src/shared/api/admin-user.validator';
import { isCorrectUser } from './user.validator';

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

      if (isAdminUser(authorizer)) {
        next();
        return;
      }

      if (!isCorrectUser(authorizer, handler.event.pathParameters)) {
        throw new createError.Forbidden('You are not allowed to read or write someone elses data');
      }

      next();
    },
  };
};
