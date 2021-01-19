import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { Injectable } from 'injection-js';
import { getFileSuffixForContentType } from '../utils/image-mime-types';

@Injectable()
export class S3RequestFactory {
  public createPutObjectRequest(userId: string, contentType: string): PutObjectRequest {
    return {
      Bucket: process.env.SONG_CONTEST_RATER_IMAGES_BUCKET,
      Key: `uploads/${userId}.${getFileSuffixForContentType(contentType)}`,
      ContentType: contentType,
      Metadata: {
        userid: userId,
      },
    };
  }
}
