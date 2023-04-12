import { Injectable } from '@nestjs/common'
import * as extract from 'pdf-text-extract'
import * as fs from 'fs'
import { finished } from 'stream/promises'
import * as path from 'path'
import * as pdf from 'pdf-parse'

@Injectable()
export class UploadService {
  async singleUpload(file: any, currentUser: any) {
    const fileInfo = await file
    const stream = fileInfo.createReadStream()
    const pathFile = path.join(process.cwd(), 'local-file-output.pdf')
    const out = fs.createWriteStream(pathFile)
    stream.pipe(out)
    await finished(out)
    const dataBuffer = fs.readFileSync(pathFile)
    const data = await pdf(dataBuffer)
    const { text } = data
    const arrText: [] = text.split('\n')
    const re = new RegExp(
      '[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]',
      'gu',
    )
    const arrTextRemovedVN = arrText.filter(
      (t) => !re.test(t) && t !== ' ' && t !== '',
    )
    const resText = arrTextRemovedVN.join('\n')
    const pathOutFile = path.join(process.cwd(), 'out.txt')
    fs.writeFileSync(pathOutFile, resText)
    return null
  }
}
