<template>
    <div id="app">
        <nav-bar/>
        <router-view/>
    </div>
</template>

<script>
    import NavBar from './common/NavBar'
    export default {
        components: {
            NavBar
        },
        created () {
            this.$store.dispatch('checkWeb3')
        }
    }
</script>

<style>
    #app {
        text-align: center;
    }
</style>
