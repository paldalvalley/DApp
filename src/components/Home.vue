<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <div v-if="$store.state.web3.web3Instance">
            <p>{{ $store.state.web3 }}</p>
        </div>
        <div v-else>
            메타마스크에 로그인 해주세요!
        </div>
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
