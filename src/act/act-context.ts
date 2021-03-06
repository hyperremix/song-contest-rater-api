import { DataMapper } from '@aws/dynamodb-data-mapper';
import { ReflectiveInjector } from 'injection-js';
import 'reflect-metadata';
import { createDataMapper } from 'src/shared/data-access/database-client.factory';
import { DatabaseClient } from 'src/shared/data-access/database.client';
import { ActController } from './api/act.controller';
import { ActDocumentMapper } from './data-access/act-document.mapper';
import { ActRepository } from './data-access/act.repository';

export function getActController(): ActController {
  return ReflectiveInjector.resolveAndCreate([
    { provide: DataMapper, useFactory: createDataMapper },
    DatabaseClient,
    ActDocumentMapper,
    ActRepository,
    ActController,
  ]).get(ActController);
}
