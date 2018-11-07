<template>
    <div class="container">
        <b-card-group deck class="mb-3 row card-view" v-for="index in colIteration"
                      :key="index">
            <template v-if="index !== colIteration">
                <listing class="listing-elem" v-for="rowElem in maxRowContents" :key="Date.now()"></listing>
            </template>
            <template v-else>
                <listing class="listing-elem" v-for="rowElem in rowLastIteration" :key="Date.now()"></listing>
            </template>

        </b-card-group>
    </div>
</template>

<script>
    import Listing from './Listing'
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
            colIteration () {
                return Math.ceil(this.foos.length / this.maxRowContents)
            },
            rowLastIteration () {
                return this.foos.length % this.maxRowContents
            }
        },
        components: {
            Listing
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
