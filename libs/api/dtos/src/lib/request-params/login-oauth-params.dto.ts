import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class LoginOauthParamsDto {
  @Field()
  email: string;
  @Field()
  oauthId: string;
  @Field()
  providerId: string;
}
