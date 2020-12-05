import { DataMapper } from '@aws/dynamodb-data-mapper';
import { ReflectiveInjector } from 'injection-js';
import 'reflect-metadata';
import { createDatabaseClient } from 'src/shared/data-access/database-client.factory';
import { ActController } from './api/act.controller';
import { ActDocumentMapper, ACT_DOCUMENT_MAPPER } from './data-access/act-document.mapper';
import { ActRepository } from './data-access/act.repository';

export function getActController(): ActController {
  return ReflectiveInjector.resolveAndCreate([
    { provide: DataMapper, useFactory: createDatabaseClient },
    { provide: ACT_DOCUMENT_MAPPER, useClass: ActDocumentMapper },
    ActRepository,
    ActController,
  ]).get(ActController);
}
