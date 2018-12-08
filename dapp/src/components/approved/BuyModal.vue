<template>
    <div>
        <b-modal ref="createForm" size="lg" hide-footer title="다이어트 비법">
            <form @submit.prevent="submitForm(formData)">
                <b-container fluid>
                    <p>{{ description }}</p>
                </b-container>
            </form>
        </b-modal>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { getEventsFromBlock } from '../../utils/getEventFromBlock'
  export default {
    data () {
      return {
        description: ''
      }
    },
    methods: {
      async triggerBuyForm (listingID) {
        const check = await this.contractMethods.checkBuyerOwnership(listingID).call({
          from: this.web3.coinbase
        })
        this.description = this.listingArray[listingID].data.description
        if (check) {
          this.$refs.createForm.show()
        } else {
          let myLumy = await this.contractMethods.balanceOf(this.web3.coinbase).call()
          alert(`나의 루미: ${myLumy}LMT\n구매가: 30LMT`)
          const filter = { listingID }
          const eventName = 'ListingCreated'
          const listingArray = await getEventsFromBlock(eventName, filter)
          const seller = listingArray[0].party
          await this.contractMethods.buyListing(listingID, seller).send({
            from: this.web3.coinbase,
            gas: 3000000,
          })
          myLumy = await this.contractMethods.balanceOf(this.web3.coinbase).call()
          alert(`구매 완료!\n잔여 루미: ${myLumy}LMT`)
          this.$EventBus.$emit('completePayment')
          this.$refs.createForm.show()
        }
      }
    },
    computed: {
      ...mapState({
        listingArray: state => state.listing.listingArray,
        web3: state => state.blockSync.web3
      }),
      ...mapGetters('blockSync', [
        'contractMethods'
      ])
    },
    mounted() {
      this.$EventBus.$on('buyButtonClicked', this.triggerBuyForm)
    }
  }
</script>
