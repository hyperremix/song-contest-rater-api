import { S3 } from 'aws-sdk';

export const createS3 = () =>
  new S3({
    signatureVersion: 'v4',
  });
