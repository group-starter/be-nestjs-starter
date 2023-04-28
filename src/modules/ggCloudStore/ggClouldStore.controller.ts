import { Controller, Post } from '@nestjs/common'
import { GGCloudStoreService } from './ggCloudStore.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist/decorators'

@ApiBearerAuth()
@ApiTags('GGCloudStore')
@Controller('ggCloudStore')
export class GGCloudStoreController {
  constructor(private ggCloudStoreService: GGCloudStoreService) {}
  @Post()
  upload() {
    return this.ggCloudStoreService.upload()
  }
}
