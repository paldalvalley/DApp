<template>
    <div class="container">
        <b-card-group deck class="mb-3 row card-view" v-for="index in colIteration"
                      :key="index">
            <template v-if="index !== colIteration">
                <listing class="listing-elem" v-for="rowElem in maxRowContents" :key="rowElem"></listing>
            </template>
            <template v-else>
                <listing class="listing-elem" v-for="rowElem in rowLastIteration" :key="rowElem + 100"></listing>
            </template>

        </b-card-group>
        <button @click="$store.dispatch('loadAllListings')">확인</button>
        {{ $store.state.listingArray[0] }}
    </div>
</template>

<script>
    import Listing from './Listing'
    import { mapGetters } from 'vuex'
    export default {
        name: 'listings',
        data () {
            return {
                foos: [
                    {
                        name: 'a'
                    },
                    {
                        name: 'b'
                    },
                    {
                        name: 'c'
                    },
                    {
                        name: 'd'
                    },
                    {
                        name: 'e'
                    }
                ],
                maxRowContents: 3,
                iterationFlag: 0
            }
        },
        computed: {
            ...mapGetters([
                'contractInstance'
            ]),
            colIteration () {
                return Math.ceil(this.foos.length / this.maxRowContents)
            },
            rowLastIteration () {
                return this.foos.length % this.maxRowContents
            }
        },
        methods: {
        },
        components: {
            Listing
        },
        beforeCreate() {
            this.$store.dispatch('loadAllListings')
        }
    }
</script>

<style scoped>
    .card-view {
        margin: 20px auto auto auto;
    }
    .listing-elem {
        transform: scale(1);
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -ms-transform: scale(1);
        -o-transform: scale(1);
        transition: all 0.1s ease-in-out;
    }
    .listing-elem:hover {
        transform: scale(1.10);
        -webkit-transform: scale(1.10);
        -moz-transform: scale(1.10);
        -ms-transform: scale(1.10);
        -o-transform: scale(1.10);
    }
</style>
