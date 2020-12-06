import validator from '@middy/validator';
import { createCreateInputSchema } from 'src/shared/api/schema.factory';
import { middify } from 'src/shared/api/third-party.middleware';
import { createResponse } from '../shared/api/response.factory';
import { getActController } from './act-context';
import { actBaseSchema } from './model/act';

export const createAct = middify(async ({ body }) => {
  const result = await getActController().create(body);
  return createResponse(201, result);
}).use(validator({ inputSchema: createCreateInputSchema(actBaseSchema) }));

export const listActs = middify(async () => {
  const result = await getActController().list();
  return createResponse(200, result);
});

export const getAct = middify(async ({ pathParameters: { id } }) => {
  const result = await getActController().get(id);
  return createResponse(200, result);
});
