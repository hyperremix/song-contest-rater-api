import createError from 'http-errors';
import { isAdminUser } from './admin-user.validator';

const IS_OFFLINE = process.env.IS_OFFLINE;

export const adminAuthorizer = () => {
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

      if (!isAdminUser(authorizer)) {
        throw new createError.Forbidden('You do not have the permission to access this resource');
      }

      next();
    },
  };
};
