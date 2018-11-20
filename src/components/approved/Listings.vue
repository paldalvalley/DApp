<template>
    <div class="container">
        <b-card-group deck class="mb-3 row card-view" v-for="index in colIteration"
                      :key="index">
            <template v-if="index !== colIteration || !rowLastIteration">
                <!-- computed로 받을 수는 없을까 생각 -->
                <listing class="listing-elem" v-for="rowElem in maxRowContents"
                         :key="listingArray[rowElem + (maxRowContents * (index - 1)) - 1].listingID"
                         :listingIdx="rowElem + (maxRowContents * (index - 1)) - 1">
                </listing>
            </template>
            <template v-else>
                <listing class="listing-elem" v-for="rowElem in rowLastIteration"
                         :key="listingArray[rowElem + (maxRowContents * (index - 1)) - 1].listingID"
                         :listingIdx="rowElem + (maxRowContents * (index - 1)) - 1">
                </listing>
            </template>
        </b-card-group>
    </div>
</template>

<script>
  import Listing from './Listing'
  import { mapState } from 'vuex'
  export default {
    name: 'listings',
    data () {
      return {
        maxRowContents: 3
      }
    },
    computed: {
      ...mapState({
        contractInstance: state => state.blockSync.contractInstance,
        listingArray: state => state.listing.listingArray
      }),
      colIteration () {
        return Math.ceil(this.listingArray.length / this.maxRowContents)
      },
      rowLastIteration () {
        return this.listingArray.length % this.maxRowContents
      }
    },
    methods: {
    },
    components: {
      Listing
    },
    async beforeCreate() {
      await this.$store.dispatch('listing/loadAllListings')
    },
    async beforeUpdate() {
      // await this.$store.dispatch('listing/loadAllListings')
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
