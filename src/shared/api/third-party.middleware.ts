import middy from '@middy/core';
import cors from '@middy/http-cors';
import httpErrorHandler from '@middy/http-error-handler';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import jsonBodyParser from '@middy/http-json-body-parser';

export const middify = (handler) =>
  middy(handler).use([
    jsonBodyParser(),
    httpHeaderNormalizer(),
    httpEventNormalizer(),
    httpErrorHandler(),
    cors(),
  ]);
