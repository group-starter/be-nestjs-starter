import { Module } from '@nestjs/common'
import { GGCloudStoreService } from '@/modules/ggCloudStore/ggCloudStore.service'
import { GGCloudStoreController } from '@/modules/ggCloudStore/ggClouldStore.controller'

@Module({
  imports: [],
  controllers: [GGCloudStoreController],
  providers: [GGCloudStoreService],
  exports: [GGCloudStoreService],
})
export class GGCloudStoreModule {}
