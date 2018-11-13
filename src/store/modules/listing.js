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

        commit('setListingArray', listingArray)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
