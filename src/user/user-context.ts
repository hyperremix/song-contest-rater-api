import { DataMapper } from '@aws/dynamodb-data-mapper';
import { ReflectiveInjector } from 'injection-js';
import 'reflect-metadata';
import { createDataMapper } from 'src/shared/data-access/database-client.factory';
import { DatabaseClient } from 'src/shared/data-access/database.client';
import { UserController } from './api/user.controller';
import { UserDocumentMapper } from './data-access/user-document.mapper';
import { UserRepository } from './data-access/user.repository';

export function getUserController(): UserController {
  return ReflectiveInjector.resolveAndCreate([
    { provide: DataMapper, useFactory: createDataMapper },
    DatabaseClient,
    UserDocumentMapper,
    UserRepository,
    UserController,
  ]).get(UserController);
}
