import Vue from 'vue'
import Vuex from 'vuex'
import { lib } from '../modules/lib'
import { blockSync } from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        blockSync
    },
    state: {
        listingArray: []
    },
    getters: {
        listingArray: state => state.listingArray
    },
    mutations: {
        setListingArray (state, payload) {
            state.listingArray = payload
        }
    },
    actions: {
        /**
         * TODO: 현재는 ListingCreated event만 고려.
         * 향후 ListingUpdated 등의 event에 대한 처리도 필요
         *
         * 글 게시할 시에 실시간 반영 문제
         * */
        async loadAllListings ({ commit, state }) {
            let listingArray = []
            let events = await state.blockSync.contractInstance().getPastEvents('ListingCreated', {
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
})
