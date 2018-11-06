<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <p>{{ $store.state.web3 }}</p>
    </div>
</template>

<script>
    // @ is an alias to /src
    export default {
        name: 'home',
        created () {
            this.$store.dispatch('checkWeb3')
        }
    }
</script>
