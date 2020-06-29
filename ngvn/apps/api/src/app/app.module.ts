import { Module } from '@nestjs/common';
import { ApiCachingModule } from '@ngvn/api/caching';
import { ApiConfigModule } from '@ngvn/api/config';
import { AutomapperModule } from 'nestjsx-automapper';

@Module({
  imports: [AutomapperModule.withMapper(), ApiConfigModule, ApiCachingModule],
})
export class AppModule {}
