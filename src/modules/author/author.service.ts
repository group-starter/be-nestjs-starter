import { Injectable } from '@nestjs/common'
import { Author } from '@/graphql'

@Injectable()
export class AuthorService {
  private readonly authors: Author[] = []

  findOneById(id: string) {
    return this.authors.find((i) => i._id === id)
  }

  findAll(callback?: (...args: any[]) => any): Author[] {
    if (callback) {
      return this.authors.filter(callback)
    }
    return this.authors
  }

  create(newAuthor: Author) {
    const newAuthorCreate = {
      ...newAuthor,
      _id: '' + +new Date(),
    }
    this.authors.push(newAuthorCreate)
    return newAuthorCreate
  }
}
