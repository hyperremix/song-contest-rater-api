import { ratingSchema } from '@hyperremix/song-contest-rater-model';
import validator from '@middy/validator';
import { createInputSchema } from 'src/shared/api/schema.factory';
import { middify } from 'src/shared/api/third-party.middleware';
import { createResponse } from '../shared/api/response.factory';
import { getRatingController } from './rating-context';

export const createRating = middify(async ({ body }) => {
  const result = await getRatingController().create(body);
  return createResponse(201, result);
}).use([validator({ inputSchema: createInputSchema(ratingSchema) })]);

export const listRatings = middify(async ({ multiValueQueryStringParameters }) => {
  const result = multiValueQueryStringParameters?.ids
    ? await getRatingController().query(multiValueQueryStringParameters.ids)
    : await getRatingController().list();
  return createResponse(200, result);
});

export const getRating = middify(async ({ pathParameters: { id } }) => {
  const result = await getRatingController().get(id);
  return createResponse(200, result);
});

export const updateRating = middify(async ({ body, pathParameters: { id } }) => {
  const bodyWithId = { ...body, id };
  const result = await getRatingController().update(bodyWithId);
  return createResponse(200, result);
}).use([validator({ inputSchema: createInputSchema(ratingSchema) })]);

export const deleteRating = middify(async ({ pathParameters: { id } }) => {
  const result = await getRatingController().delete(id);
  return createResponse(200, result);
});
