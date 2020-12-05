import { middify } from 'src/shared/api/third-party.middleware';
import { createResponse } from '../shared/api/response.factory';
import { ActController } from './api/act.controller';
import { ActDocumentMapper } from './data-access/act-document.mapper';
import { ActRepository } from './data-access/act.repository';

const controller = new ActController(new ActRepository(new ActDocumentMapper()));

export const createAct = middify(async (event) => {
  await controller.create(event.body);
  return createResponse(201);
});

export const listActs = middify(async () => {
  const result = await controller.list();
  return createResponse(200, result);
});
