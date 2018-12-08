<template>
    <b-card border-variant="dark"
            :header="data.title"
            align="center"
            v-if="!state">
        <p class="card-text">닉네임: {{ data.nickname }}</p>
        <p class="card-text">성별: {{ checkSex(data.sex) }}</p>
        <p class="card-text">나이: {{ data.age}}</p>
        <p class="card-text">키: {{ data.height }}</p>
        <p class="card-text">몸무게: {{ data.weight }}</p>
        <b-button size="sm" variant="dark" @click="triggerBuyForm">구매</b-button>
    </b-card>
    <b-card border-variant="danger"
            header-bg-variant="danger"
            :header="data.title"
            align="center"
            v-else>
        <p class="card-text">닉네임: {{ data.nickname }}</p>
        <p class="card-text">성별: {{ checkSex(data.sex) }}</p>
        <p class="card-text">나이: {{ data.age}}</p>
        <p class="card-text">키: {{ data.height }}</p>
        <p class="card-text">몸무게: {{ data.weight }}</p>
        <b-button size="sm" variant="danger" @click="triggerBuyForm">읽기</b-button>
    </b-card>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  export default {
    name: 'listing',
    data () {
      return {
        state: false
      }
    },
    computed: {
      ...mapState({
        listingArray: state => state.listing.listingArray,
        web3: state => state.blockSync.web3
      }),
      ...mapGetters('blockSync', [
        'contractMethods'
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
      },
      triggerBuyForm () {
        console.log('listingID:')
        console.log(this.listingID)
        console.log(this.listingArray[0].data)
        this.$EventBus.$emit('buyButtonClicked', this.listingID)
      },
      async triggerCompletePayment () {
        this.state = await this.contractMethods.checkBuyerOwnership(this.listingID).call({
          from: this.web3.coinbase
        })
      }
    },
    props: {
      listingIdx: {
        type: Number
      },
      listingID: {
        type: String
      }
    },
    async mounted () {
      this.state = await this.contractMethods.checkBuyerOwnership(this.listingID).call({
        from: this.web3.coinbase
      })
      this.$EventBus.$on('completePayment', this.triggerCompletePayment)
    }
  }
</script>
