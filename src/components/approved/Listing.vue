<template>
    <b-card border-variant="dark" :header="data.title" align="center">
        <p class="card-text">닉네임: {{ data.nickname }}</p>
        <p class="card-text">성별: {{ checkSex(data.sex) }}</p>
        <p class="card-text">나이: {{ data.age}}</p>
        <p class="card-text">키: {{ data.height }}</p>
        <p class="card-text">몸무게: {{ data.weight }}</p>
    </b-card>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'listing',
        computed: {
            ...mapState('listing', [
                'listingArray'
            ]),
            data () {
                return this.listingArray[this.listingIdx].data
            }
        },
        methods: {
            checkSex (sex) {
                if (sex === 0) return '여성'
                else if (sex === 1) return '남성'
                else return '성별 없음'
            }
        },
        props: {
            listingIdx: {
                type: Number
            }
        }
    }
</script>
