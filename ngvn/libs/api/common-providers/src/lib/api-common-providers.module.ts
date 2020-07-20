import { Global, Module } from '@nestjs/common';
import { MarkdownService } from './services/markdown.service';

@Global()
@Module({
  providers: [MarkdownService],
  exports: [MarkdownService],
})
export class ApiCommonProvidersModule {}
