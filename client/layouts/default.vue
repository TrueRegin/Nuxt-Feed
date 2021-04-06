<template>
    <div id="app">
        <Nuxt />
    </div>
</template>

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
    min-height: 100%;
    box-sizing: border-box;
}

#app {
    background: var(--background);
}
</style>
