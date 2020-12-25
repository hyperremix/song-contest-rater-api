import createError from 'http-errors';

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

      let userGroups = authorizer?.claims?.['cognito:groups'];
      if (!userGroups) {
        throw new createError.Forbidden('You do not have any role associated with your account');
      }

      if (typeof userGroups === 'string') {
        userGroups = [userGroups];
      }

      if (!userGroups.length) {
        throw new createError.Forbidden('You do not have any role associated with your account');
      }

      if (!userGroups.some((val) => val === 'Admin')) {
        throw new createError.Forbidden('You do not have the permission to access this resource');
      }

      next();
    },
  };
};
