import { Injectable } from '@nestjs/common'
import { join } from 'path'
import { Storage } from '@google-cloud/storage'

@Injectable()
export class GGCloudStoreService {
  private readonly url = join(
    process.cwd(),
    'src',
    'keys',
    'my-project-store-385103-0a45f84e5339.json',
  )
  private readonly bucketName = 'bucket-quickstart_my-project-store-385103'
  private storage = new Storage({
    keyFilename: this.url,
    projectId: this.bucketName,
  })
  private myBucket = this.storage.bucket(this.bucketName)

  async upload() {
    // for test
    const buckets = this.myBucket.upload(
      join(process.cwd(), 'src', 'assets', 'kitten.png'),
      {
        destination: 'quickstart-folder/kitten2.png',
      },
    )
    return buckets
  }
}
