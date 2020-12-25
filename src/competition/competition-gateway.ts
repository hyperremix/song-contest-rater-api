import { competitionSchema } from '@hyperremix/song-contest-rater-model';
import validator from '@middy/validator';
import { adminAuthorizer } from 'src/shared/api/admin-authorizer.middleware';
import { createResponse } from 'src/shared/api/response.factory';
import { createInputSchema } from 'src/shared/api/schema.factory';
import { middify } from 'src/shared/api/third-party.middleware';
import { getCompetitionController } from './competition-context';

export const createCompetition = middify(async ({ body }) => {
  const result = await getCompetitionController().create(body);
  return createResponse(201, result);
}).use([adminAuthorizer(), validator({ inputSchema: createInputSchema(competitionSchema) })]);

export const listCompetitions = middify(async () => {
  const result = await getCompetitionController().list();
  return createResponse(200, result);
});

export const getCompetition = middify(async ({ pathParameters: { id } }) => {
  const result = await getCompetitionController().get(id);
  return createResponse(200, result);
});

export const updateCompetition = middify(async ({ body, pathParameters: { id } }) => {
  const bodyWithId = { ...body, id };
  const result = await getCompetitionController().update(bodyWithId);
  return createResponse(200, result);
}).use([adminAuthorizer(), validator({ inputSchema: createInputSchema(competitionSchema) })]);

export const deleteCompetition = middify(async ({ pathParameters: { id } }) => {
  const result = await getCompetitionController().delete(id);
  return createResponse(200, result);
}).use(adminAuthorizer());
