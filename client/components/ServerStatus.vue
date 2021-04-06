<template>
    <div
        class="server-status"
        :class="{ online: server_online, offline: !server_online }"
    >
        Server {{ server_online ? 'Online' : 'Offline' }}
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
    server_online: boolean = false
    beforeMount() {
        this.$axios.get('/').then(() => {
            this.server_online = true
        })
    }
}
</script>

<style lang="scss" scoped>
.server-status {
    margin: 20px;
    padding: 20px;
    color: #fff;
    background: #000;
    border: 3px solid #fff;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: 0 3px 10px #0007;
    cursor: pointer;
    user-select: none;

    &:hover {
        opacity: 0.8;
    }

    &.online {
        background: #03cc33;
        animation: hover 1s infinite;
        animation-timing-function: ease-in-out;
    }

    &.offline {
        background: #daad28;
    }
}
</style>
