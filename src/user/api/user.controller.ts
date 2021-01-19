import { InitiateAvatarUploadResponse, User } from '@hyperremix/song-contest-rater-model';
import createHttpError from 'http-errors';
import { Injectable } from 'injection-js';
import getUuidByString from 'uuid-by-string';
import { S3Client } from '../data-access/s3.client';
import { UserRepository } from '../data-access/user.repository';
import { getSupportedContentTypes, isValidImageContentType } from '../utils/image-mime-types';

@Injectable()
export class UserController {
  constructor(private userRepository: UserRepository, private s3Client: S3Client) {}

  public async create(user: User): Promise<User> {
    user.id = getUuidByString(user.email);
    return await this.userRepository.insert(user);
  }

  public async list(): Promise<User[]> {
    return await this.userRepository.list();
  }

  public async get(id: string): Promise<User> {
    return await this.userRepository.get(id);
  }

  public async update(user: User): Promise<User> {
    return await this.userRepository.update(user);
  }

  public async delete(id: string): Promise<User> {
    return await this.userRepository.delete(id);
  }

  public async initiateAvatarUpload(
    id: string,
    contentType: string
  ): Promise<InitiateAvatarUploadResponse> {
    await this.userRepository.get(id);

    if (!isValidImageContentType(contentType)) {
      throw new createHttpError.BadRequest(
        `Invalid contentType ${contentType} for image. Valid values are: ${getSupportedContentTypes().join(
          ','
        )}`
      );
    }

    const signedUrl = await this.s3Client.getSignedPutObjectUrl(id, contentType);
    return { signedUrl };
  }

  public async processUploadedAvatar(bucketName: string, objectKey: string): Promise<void> {
    const s3Object = await this.s3Client.headObject(bucketName, objectKey);
    if (!s3Object.Metadata) {
      throw new Error(
        `Cannot process avatar ${objectKey} in bucket ${bucketName} as it has no metadata`
      );
    }

    const user = await this.userRepository.get(s3Object.Metadata.userid);

    user.avatarUrl = `https://${bucketName}.s3.eu-central-1.amazonaws.com/${objectKey}`;

    await this.userRepository.update(user);
  }
}
