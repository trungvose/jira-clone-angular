import { Field, ObjectType } from '@nestjs/graphql';
import addMilliseconds from 'date-fns/addMilliseconds';
import parse from 'date-fns/parse';
import ms from 'ms';

@ObjectType()
export class TokenResultDto {
  @Field()
  token: string;
  @Field()
  expiry: Date;

  computeExpiry(jwtExpired: string) {
    const milli = ms(jwtExpired);
    const now = Date.now();
    this.expiry = parse(addMilliseconds(now, milli).toLocaleString(), 'M/d/yyyy, h:mm:ss aaa', now);
  }
}
