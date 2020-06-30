import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { User } from './user.model';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([User.featureConfig])],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export class ApiUserModule {}
