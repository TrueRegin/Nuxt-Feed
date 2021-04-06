import _ from 'lodash'
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

export type PostReply = {
    target: string
    message: string
    created: Date
}

export type Post = {
    _id: string
    title: string
    content: string
    created: Date
    replies: PostReply[]
}

export const POSTS_STORE = 'posts'
@Module({ name: POSTS_STORE, namespaced: true, stateFactory: true })
export default class extends VuexModule {
    posts: Post[] = []
    initialized = false

    @Mutation initPosts(payload: Post[]) {
        if (!this.initialized) {
            this.posts = [...payload]
        }
        this.initialized = true
    }

    @Mutation
    addPost(payload: Post) {
        payload.replies = []
        this.posts = [payload, ...this.posts]
    }

    @Mutation
    addReply({ index, reply }: { index: number; reply: PostReply }) {
        const posts = [...this.posts]
        this.posts[index].replies.push(reply)
        this.posts = [...posts]
    }

    get getPosts() {
        return _.cloneDeep(this.posts)
    }
}
