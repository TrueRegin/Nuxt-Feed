<template>
    <div :id="getId" class="post-wrapper">
        <div class="post">
            <div class="title">
                <h1>{{ post.title }}</h1>
                <p>
                    Created:
                    {{ new Date(post.created).toLocaleDateString() }}
                </p>
            </div>
            <p>{{ post.content }}</p>

            <ul class="reply-list">
                <li
                    v-for="reply in post.replies"
                    :key="reply.created.getTime"
                    class="reply"
                >
                    {{ reply.message }}
                </li>
            </ul>
        </div>
        <div v-if="replying" class="reply-box">
            <button class="close-reply" @click="replying = false">
                Close Reply ✖
            </button>
            <input
                ref="input"
                v-model.trim="replyMessage"
                placeholder="Reply..."
                type="text"
                @keypress.enter="sendReply"
            />
            <button class="submit-reply" @click="sendReply">Reply</button>
        </div>
        <button class="open-reply" :class="{ replying }" @click="openReply">
            Reply ↩
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace, Prop } from 'nuxt-property-decorator'
import { Post, PostReply, POSTS_STORE } from '~/store/posts'

const PostsStore = namespace(POSTS_STORE)

@Component
export default class extends Vue {
    @Prop({ required: true }) post!: Post
    @Prop({ required: true }) index!: number
    @PostsStore.Mutation addReply!: (payload: {
        index: number
        reply: PostReply
    }) => void

    replying: boolean = false
    replyMessage: string = ''

    openReply() {
        this.replying = true
        this.$nextTick(() => {
            const input = this.$refs.input as HTMLInputElement
            input.focus()
        })
    }

    sendReply() {
        this.$axios
            .post('/posts/reply', {
                target: this.post._id,
                message: this.replyMessage,
            })
            .then((res) => {
                console.log(res.data)
                this.addReply({ index: this.index, reply: res.data })
            })

        this.replying = false
        this.replyMessage = ''
    }

    get getId() {
        return `#post-${this.post._id}`
    }
}
</script>

<style lang="scss">
@import '~/assets/main.scss';

.post-wrapper {
    transition: background $t-bg, border $t-border;
    width: 100%;
    height: max-content;
    background: var(--primary);
    border: 2px solid var(--border-p);
    border-radius: 5px;
    overflow: hidden;
    position: relative;

    .post {
        display: grid;
        align-content: center;

        .title {
            display: flex;
            align-items: center;

            h1 {
                font-size: 1.5rem;
                font-weight: 800;
                margin-right: 20px;
            }
        }

        .reply-list {
            border-top: 2px solid var(--color-dark);
            list-style-type: disc;
            .reply {
            }
        }

        box-sizing: border-box;
        color: var(--color);
        padding: 5px;
        transition: transform 0.3s, margin 0.2s;
        transition-timing-function: ease;
    }

    .reply-box {
        transform-origin: top;
        animation: pop-in 0.2s alternate;
        display: grid;

        grid-template-columns: max-content 1fr max-content;
        color: var(--color-dark);
        border-top: 2px solid var(--border-p);

        button {
            outline: none;
            user-select: none;
        }

        input {
            width: 100%;
            outline: none;
            padding-left: 4px;
        }
    }

    .open-reply {
        background: #000;
        padding: 3px 8px;
        box-sizing: border-box;
        border-radius: 0 5px 0 0;
        color: #fff;
        transform: translateX(-150%) scaleY(0);
        transition: transform 0.2s;
        transition-timing-function: ease;
        transform-origin: bottom;
        outline: none;

        &.replying {
            position: absolute;
        }
    }

    &:hover {
        .post {
            transform: translateX(30px);
            margin: 0 0 10px 10px;
        }

        .open-reply:not(.replying) {
            transform: translateX(0%) scaleY(1);
        }
    }
}
</style>
