import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

@Global()
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [],
  exports: [PassportModule],
})
export class PassportGlobalModule {}
