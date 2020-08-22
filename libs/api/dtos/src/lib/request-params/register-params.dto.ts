import { ArgsType, Field } from '@nestjs/graphql';
import { LoginParamsDto } from './login-params.dto';

@ArgsType()
export class RegisterParamsDto extends LoginParamsDto {
  @Field()
  fullName: string;
}
