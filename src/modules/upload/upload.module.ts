import { Module } from '@nestjs/common'
import { UploadService } from '@/modules/upload/upload.service'
import { AuthModule } from '../auth/auth.module'
import { UploadResolver } from './upload.resolver'

@Module({
  imports: [AuthModule],
  providers: [UploadResolver, UploadService],
  exports: [UploadService],
})
export class UploadModule {}
