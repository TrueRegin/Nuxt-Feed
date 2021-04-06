<template>
    <div id="home">
        <div id="header">
            <nuxt-link to="/"> <h1>Nuxt Feed</h1></nuxt-link>
        </div>
        <div id="create-post">
            <h1>Create a Post</h1>
            <input v-model.trim="title" placeholder="Post Title" type="text" />
            <textarea v-model.trim="content" placeholder="Content"></textarea>
            <button @click.prevent="publishPost">Submit Post</button>
        </div>

        <div id="posts-container">
            <Post
                v-for="(post, index) in getPosts"
                :key="post._id"
                :index="index"
                :post="post"
            ></Post>
        </div>
    </div>
</template>

<script lang="ts">
import ServerStatus from '@/components/ServerStatus.vue'
import { Component, namespace } from 'nuxt-property-decorator'
import Vue from 'vue'
import { Post, POSTS_STORE } from '~/store/posts'

const PostsStore = namespace(POSTS_STORE)

@Component({
    components: {
        ServerStatus,
    },
})
export default class extends Vue {
    @PostsStore.Getter getPosts!: Post[]
    @PostsStore.Mutation addPost!: (post: Post) => void
    @PostsStore.Mutation initPosts!: (posts: Post[]) => void
    title: string = ''
    content: string = ''

    async publishPost() {
        if (
            this.title.length >= 5 &&
            this.title.length <= 100 &&
            this.content.length < 5000
        ) {
            const post = (
                await this.$axios.post('/posts/create', {
                    title: this.title,
                    content: this.content,
                })
            ).data as Post
            this.addPost(post)
        }
    }

    async fetch() {
        const posts = (await this.$axios.get('/posts')).data as Post[]
        console.log({ posts })
        this.initPosts(posts)
    }

    reply() {}
}
</script>

<style lang="scss">
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
#home {
    display: grid;
    grid-template-rows: max-content 300px 1fr;
    height: 100%;
    box-sizing: border-box;
}

#header {
    display: grid;
    box-sizing: border-box;
    align-content: center;
    padding-left: 20px;
    font-size: 3rem;
    font-family: Dosis;
    color: var(--secondary);
    background: var(--tertiary);
    user-select: none;
    cursor: pointer;
}

#create-post {
    display: grid;
    grid-auto-flow: row;
    box-sizing: border-box;
    padding: 20px;
    box-shadow: 0 6px 12px #0005;
    gap: 20px;
    background: var(--secondary);
    color: var(--color);

    h1 {
        font-size: 2rem;
    }

    input,
    textarea {
        color: var(--color-dark);
        outline: none;
        border-bottom: 2px solid #003;
        resize: none;
        box-sizing: border-box;
        padding: 4px 8px 4px 4px;
        border-radius: 5px 5px 0 0;
        box-shadow: 0 3px 7px #0003;
    }

    button {
        border-radius: 100px;
        padding: 8px 20px;
        font-size: 1.5rem;
        width: max-content;
    }
}

#posts-container {
    box-sizing: border-box;
    padding: 20px;
    display: grid;
    gap: 5px;
}
</style>
