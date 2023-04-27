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
    const tmp = resText
    const questionsRaw = tmp.split(/Question/)
    const arrTitle = ['Mark the letter ', 'Read  the  following']
    const objJSON = []
    let curInstruction
    questionsRaw.forEach((quest) => {
      let instruction
      if (
        !quest.includes('A.') ||
        !quest.includes('B.') ||
        !quest.includes('C.') ||
        !quest.includes('D.')
      ) {
        instruction = quest
        curInstruction = {
          instruction,
          questions: [],
        }
        objJSON.push(curInstruction)
        return
      }
      const title = `Question${quest.substring(0, quest.indexOf('A. '))}`
      const ans = quest.substring(quest.indexOf('A. '), quest.indexOf('D. '))
      const ansA = ans.substring(ans.indexOf('A. '), ans.indexOf('B. '))
      const ansB = ans.substring(ans.indexOf('B. '), ans.indexOf('C. '))
      const ansC = ans.substring(ans.indexOf('C. '))

      const ansDRaw = quest.substring(quest.indexOf('D. '))
      const ansD = ansDRaw.substring(
        ansDRaw.indexOf('D. '),
        ansDRaw.indexOf('\n'),
      )

      curInstruction.questions.push({
        title,
        reusults: {
          A: ansA.replace('\n', '').trim(),
          B: ansB.replace('\n', '').trim(),
          C: ansC.replace('\n', '').trim(),
          D: ansD.replace('\n', '').trim(),
        },
      })
      arrTitle.forEach((t: string) => {
        if (arrTitle.includes(t)) {
          instruction = ansDRaw.substring(ansDRaw.indexOf('\n'))
        }
      })
      if (instruction && instruction !== '\n') {
        curInstruction = {
          instruction,
          questions: [],
        }
        objJSON.push(curInstruction)
      }
    })
    const pathOutFile = path.join(process.cwd(), 'out.txt')
    fs.writeFileSync(pathOutFile, JSON.stringify(objJSON, null, 2))
    return null
  }
}
