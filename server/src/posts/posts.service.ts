import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreatePostDto from './create-post.dto';
import { Post, PostDocument } from './post.schema';
import { ObjectID } from 'mongodb';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
    ) {}

    getPost(_id: string) {
        return this.postModel.findOne({ _id }).exec();
    }

    getPosts(): Promise<Post[]> {
        return this.postModel.find({}).exec();
    }

    createPost(createPostDto: CreatePostDto) {
        const newPost = {
            ...createPostDto,
            created: new Date(),
            replies: [],
        };
        const post = new this.postModel(newPost);
        return post.save();
    }

    reply(_id: string, message: string) {
        const reply = { target: _id, message, created: new Date() };
        this.postModel.updateOne(
            { _id: new ObjectID(_id) },
            {
                $push: {
                    replies: reply,
                },
            },
        );
        return reply;
    }
}
