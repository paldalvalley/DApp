import axios from "axios";

const state = {
  listingArray: []
}

const mutations = {
  setListingArray (state, payload) {
    state.listingArray = payload
  }
}

const actions = {
  /**
   * TODO: 현재는 ListingCreated event만 고려.
   * 향후 ListingUpdated 등의 event에 대한 처리도 필요
   *
   * 글 게시할 시에 실시간 반영 문제
   * */
  async loadAllListings ({ commit }) {
    const eventName = 'ListingCreated'
    const listingArray = await this.getEventsFromBlock(eventName)
    // const listingArray = await this.getEventsFromBlock(eventName, { listingID: [2, 3] })

    commit('setListingArray', listingArray)
  },
  async triggerListener ({ commit }) {
    const { data } = await axios.post('http://192.168.43.236:3000/api/create', {})

    const filter = { listingID: data }
    let listingArray = await this.getEventsFromBlock('ListingCreated', filter)
    commit('setListingArray', listingArray)
    return data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
