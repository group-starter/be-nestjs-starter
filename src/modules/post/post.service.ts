import { Injectable } from '@nestjs/common'
import { ByUser, Post } from '@/graphql'
import { InjectModel } from '@nestjs/mongoose'
import { PostDocument, PostSchemaClass } from '@/schemas/post.schema'
import { FilterQuery, Model } from 'mongoose'

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostSchemaClass.name)
    private postModel: Model<PostDocument> & {
      softDeletes: (
        model: Model<PostDocument>,
        filter: FilterQuery<PostSchemaClass>,
        byUser: ByUser,
      ) => void
    },
  ) {}

  private readonly posts: Post[] = []

  findOneById(id: string) {
    return this.posts.find((i) => i._id === id)
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find()
  }

  async create(newPost: Post, currentUser: any): Promise<Post> {
    const newPostCreate = {
      ...newPost,
      createdBy: {
        _id: currentUser._id,
        fullName: currentUser.fullName,
      },
    }
    const res = await this.postModel.create(newPostCreate)
    return res
  }
}
