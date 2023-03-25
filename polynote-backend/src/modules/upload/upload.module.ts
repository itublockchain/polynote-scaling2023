import { Module } from '@nestjs/common';
import { UploadController } from 'src/modules/upload/upload.controller';
import { UploadService } from 'src/modules/upload/upload.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [],
})
export class UploadModule {}
