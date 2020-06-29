import { Module } from '@nestjs/common';
import { AutomapperModule } from 'nestjsx-automapper';

@Module({
  imports: [AutomapperModule.withMapper()],
})
export class AppModule {}
