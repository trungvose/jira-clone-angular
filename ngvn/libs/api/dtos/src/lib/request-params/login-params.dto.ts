import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LoginParamsDto {
  @Field()
  email: string;
  @Field()
  password: string;
}
