import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createResponse } from '../shared/api/response.factory';
import { ActController } from './api/act.controller';
import { ActDocumentMapper } from './data-access/act-document.mapper';
import { ActRepository } from './data-access/act.repository';
import { Act } from './model/act';

const controller = new ActController(new ActRepository(new ActDocumentMapper()));

export async function createAct(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
  try {
    const act: Act = JSON.parse(event.body);
    await controller.create(act);
    return createResponse(200);
  } catch (error) {
    return createResponse(500, { message: error?.message });
  }
}

export async function listActs(): Promise<APIGatewayProxyResult> {
  try {
    const result = await controller.list();
    return createResponse(200, result);
  } catch (error) {
    return createResponse(500, { message: error?.message });
  }
}
