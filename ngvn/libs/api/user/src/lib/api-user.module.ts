import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { authConfiguration } from '@ngvn/api/config';
import { AuthConfig } from '@ngvn/api/types';
import { DocumentType } from '@typegoose/typegoose';
import { genSalt, hash } from 'bcrypt';
import { User } from './user.model';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.modelName,
        useFactory: (authConfig: AuthConfig) => {
          const schema = User.schema;
          schema.pre<DocumentType<User>>('save', async function () {
            if (this.isModified('password')) {
              const salt = await genSalt(authConfig.salt);
              this.password = await hash(this.password, salt);
            }
          });
          return schema;
        },
        inject: [authConfiguration.KEY],
      },
    ]),
  ],
  providers: [UserRepository, UserService, UserResolver],
  exports: [UserService],
})
export class ApiUserModule {}
