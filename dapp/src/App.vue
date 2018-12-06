<template>
    <div id="app">
        <nav-bar/>
        <router-view/>
    </div>
</template>

<script>
    import NavBar from './components/common/NavBar'
    export default {
        components: {
            NavBar
        },
        created () {
            this.$store.dispatch('blockSync/checkWeb3')
            this.$store.dispatch('blockSync/getContractInstance')
        }
    }
</script>

<style>
    #app {
        text-align: center;
    }
</style>
