<template>
    <div id="app" :class="`theme-${theme}`">
        <div id="theme-buttons">
            <ThemeButton v-model="theme" theme="default" />
            <ThemeButton v-model="theme" theme="draconic" />
            <ThemeButton v-model="theme" theme="radium" />
            <ThemeButton v-model="theme" theme="argentium" />
        </div>
        <div id="content">
            <Nuxt />
        </div>
    </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import Vue from 'vue'
import ThemeButton from '~/components/ThemeButton.vue'

@Component({
    components: { ThemeButton },
})
export default class extends Vue {
    theme: string = 'default'
}
</script>

<style>
body {
    margin: 0;
}
html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

html,
body,
#__nuxt,
#__layout,
#app {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}

#app {
    background: var(--background);
    display: grid;
    grid-template-rows: min-content 1fr;
}

#content {
    overflow-y: auto;
    height: 100%;
}
</style>
