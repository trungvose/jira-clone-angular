import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './user.model';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([User.featureConfig])],
  providers: [UserRepository, UserService, UserResolver],
  exports: [UserService],
})
export class ApiUserModule {
}
