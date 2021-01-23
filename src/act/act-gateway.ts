import { actSchema } from '@hyperremix/song-contest-rater-model';
import validator from '@middy/validator';
import { adminAuthorizer } from 'src/shared/api/admin-authorizer.middleware';
import { createInputSchema } from 'src/shared/api/schema.factory';
import { middify } from 'src/shared/api/third-party.middleware';
import { createResponse } from '../shared/api/response.factory';
import { getActController } from './act-context';

export const createAct = middify(async ({ body }) => {
  const result = await getActController().create(body);
  return createResponse(201, result);
}).use([adminAuthorizer(), validator({ inputSchema: createInputSchema(actSchema) })]);

export const listActs = middify(async ({ multiValueQueryStringParameters }) => {
  const result = multiValueQueryStringParameters?.ids
    ? await getActController().query(multiValueQueryStringParameters.ids)
    : await getActController().list();
  return createResponse(200, result);
});

export const getAct = middify(async ({ pathParameters: { id } }) => {
  const result = await getActController().get(id);
  return createResponse(200, result);
});

export const updateAct = middify(async ({ body, pathParameters: { id } }) => {
  const bodyWithId = { ...body, id };
  const result = await getActController().update(bodyWithId);
  return createResponse(200, result);
}).use([adminAuthorizer(), validator({ inputSchema: createInputSchema(actSchema) })]);

export const deleteAct = middify(async ({ pathParameters: { id } }) => {
  const result = await getActController().delete(id);
  return createResponse(200, result);
}).use([adminAuthorizer()]);
