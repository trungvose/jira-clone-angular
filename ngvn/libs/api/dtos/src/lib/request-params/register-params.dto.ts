import { ArgsType, Field } from '@nestjs/graphql';
import { LoginParamsDto } from './login-params.dto';

@ArgsType()
export class RegisterParamsDto extends LoginParamsDto {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
}
