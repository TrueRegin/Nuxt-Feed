<template>
    <button
        class="theme-button"
        :class="`theme-${theme}`"
        @click="$emit('input', theme)"
    >
        {{ getName() }}
    </button>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import Vue from 'vue'

@Component
export default class extends Vue {
    @Prop({ required: true }) theme!: string
    @Prop({ required: true }) value!: string

    getName() {
        return this.theme[0].toUpperCase() + this.theme.substring(1)
    }
}
</script>

<style lang="scss" scoped>
.theme-button {
    outline: none;
    user-select: none;
}
</style>
