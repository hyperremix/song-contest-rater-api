import createError from 'http-errors';
import getUuidByString from 'uuid-by-string';
import { getRatingController } from '../rating-context';

const IS_OFFLINE = process.env.IS_OFFLINE;

export const ratingUpdateAuthorizer = () => {
  return {
    before: async (handler, next) => {
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

      const ratingId = handler.event.pathParameters?.id;
      if (!ratingId) {
        throw new createError.NotFound();
      }

      const { userId } = await getRatingController().get(ratingId);
      if (userId !== getUuidByString(userEmail)) {
        throw new createError.Forbidden('You are not allowed to write someone elses data');
      }

      next();
    },
  };
};
