import {lib} from "../../modules/lib";

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
    async loadAllListings ({ commit, state, rootState }) {
        let listingArray = []
        let events = await rootState.blockSync
            .contractInstance()
            .getPastEvents('ListingCreated', {
                fromBlock: 0,
                toBlock: 'latest'
            })

        for (let i in events) {
            let listingData = events[i].returnValues
            let obj = Object.assign(
                { listingID: listingData.listingID },
                { ipfsHash: listingData.ipfsHash },
                { party: listingData.party })
            listingArray.push(obj)
        }

        for (let i in listingArray) {
            listingArray[i].data = await lib.ipfsService.loadObjFromFile(listingArray[i].ipfsHash)
        }

        commit('setListingArray', listingArray)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
