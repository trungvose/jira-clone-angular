import { Field, ObjectType } from '@nestjs/graphql';
import { PermissionDto } from '../auth';
import { UserDto } from './user.dto';

@ObjectType()
export class UserInformationDto extends UserDto {
  @Field(() => [PermissionDto])
  permissions: PermissionDto[];
}
