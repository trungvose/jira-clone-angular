import { ApiProperty } from '@nestjs/swagger';
import addMilliseconds from 'date-fns/addMilliseconds';
import parse from 'date-fns/parse';
import ms from 'ms';

export class TokenResultDto {
  @ApiProperty()
  token: string;
  @ApiProperty({ type: String, format: 'date-time' })
  expiry: Date;

  computeExpiry(jwtExpired: string) {
    const milli = ms(jwtExpired);
    const now = Date.now();
    this.expiry = parse(addMilliseconds(now, milli).toLocaleString(), 'M/d/yyyy, h:mm:ss aaa', now);
  }
}
