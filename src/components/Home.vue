<template>
    <div class="home">
        <div v-if="$store.state.web3.web3Instance">
            <approved/>
        </div>
        <div v-else>
            메타마스크에 로그인 해주세요!
        </div>
    </div>
</template>

<script>
    import Approved from '@/components/approved/Approved'
    export default {
        name: 'home',
        components: {
            Approved
        }
    }
</script>
