import { AWSError, S3 } from 'aws-sdk';
import { HeadObjectOutput } from 'aws-sdk/clients/s3';
import { PromiseResult } from 'aws-sdk/lib/request';
import { Injectable } from 'injection-js';
import { S3RequestFactory } from './s3-request.factory';

@Injectable()
export class S3Client {
  constructor(private s3: S3, private s3RequestFactory: S3RequestFactory) {}

  public async getSignedPutObjectUrl(userId: string, contentType: string): Promise<string> {
    const request = this.s3RequestFactory.createPutObjectRequest(userId, contentType);
    return await this.s3.getSignedUrlPromise('putObject', request);
  }

  public async headObject(
    bucketName: string,
    objectKey: string
  ): Promise<PromiseResult<HeadObjectOutput, AWSError>> {
    return await this.s3.headObject({ Bucket: bucketName, Key: objectKey }).promise();
  }
}
