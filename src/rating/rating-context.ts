import { DataMapper } from '@aws/dynamodb-data-mapper';
import { ReflectiveInjector } from 'injection-js';
import 'reflect-metadata';
import { createDataMapper } from 'src/shared/data-access/database-client.factory';
import { DatabaseClient } from 'src/shared/data-access/database.client';
import { RatingController } from './api/rating.controller';
import { RatingDocumentMapper } from './data-access/rating-document.mapper';
import { RatingRepository } from './data-access/rating.repository';

export function getRatingController(): RatingController {
  return ReflectiveInjector.resolveAndCreate([
    { provide: DataMapper, useFactory: createDataMapper },
    DatabaseClient,
    RatingDocumentMapper,
    RatingRepository,
    RatingController,
  ]).get(RatingController);
}
