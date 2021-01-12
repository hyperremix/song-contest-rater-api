import { User } from '@hyperremix/song-contest-rater-model';
import { Injectable } from 'injection-js';
import { DocumentMapper } from 'src/shared/data-access/document.mapper';
import { UserDocument } from './user-document';

@Injectable()
export class UserDocumentMapper implements DocumentMapper<User, UserDocument> {
  public mapForwards(model: User): UserDocument {
    const userDocument = new UserDocument();
    userDocument.id = model.id;
    userDocument.firstname = model.firstname;
    userDocument.lastname = model.lastname;
    userDocument.email = model.email;
    return userDocument;
  }

  public mapBackwards(userDocument: UserDocument): User {
    return { ...userDocument };
  }
}
