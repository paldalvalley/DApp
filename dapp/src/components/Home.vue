<template>
    <div class="home">
        <div v-if="web3.web3Instance">
            <approved/>
        </div>
        <div v-else>
            메타마스크에 로그인 해주세요!
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Approved from '@/components/approved/Approved'
    export default {
        name: 'home',
        computed: {
            ...mapState('blockSync', [
                'web3'
            ])
        },
        components: {
            Approved
        }
    }
</script>
