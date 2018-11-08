import Vue from 'vue'
import Vuex from 'vuex'
import { lib } from './modules/lib'
import { getWeb3, pollWeb3 } from './utils/getWeb3'
import { getContract } from './utils/getContract'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        web3: {
            web3Instance: null,
            networkID: null,
            coinbase: null,
            balance: null
        },
        contractInstance: null,
        listingArray: []
    },
    getters: {
        web3: state => state.web3,
        contractInstance: state => state.contractInstance,
        listingArray: state => state.listingArray
    },
    mutations: {
        setWeb3Meta (state, payload) {
            let web3Copy = state.web3
            web3Copy.web3Instance = payload.web3
            web3Copy.networkID = payload.networkID
            web3Copy.coinbase = payload.coinbase
            web3Copy.balance = parseInt(payload.balance, 10)
            state.web3 = web3Copy
            pollWeb3(state)
        },
        pollWeb3Instance (state, payload) {
            state.web3.coinbase = payload.coinbase
            state.web3.balance = parseInt(payload.balance, 10)
        },
        setContractInstance (state, payload) {
            state.contractInstance = () => payload
        },
        resetWeb3Instance (state) {
            state.web3.web3Instance = null
            state.web3.networkID = null
            state.web3.coinbase = null
            state.web3.balance = null
        },
        setListingArray (state, payload) {
            state.listingArray = payload
        }
    },
    actions: {
        async checkWeb3({ commit, state }) {
            try {
                let result = await getWeb3
                commit('setWeb3Meta', result)
            } catch (err) {
                pollWeb3(state)
            }
        },
        async getContractInstance({ commit }) {
            try {
                let result = await getContract
                commit('setContractInstance', result)
            } catch (err) {
                throw console.error('Error in action getContractInstance', err)
            }
        },
        /**
         * TODO: 현재는 ListingCreated event만 고려.
         * 향후 ListingUpdated 등의 event에 대한 처리도 필요
         * */
        async loadAllListings ({ commit, state }) {
            let listingArray = []
            let events = await state.contractInstance().getPastEvents('ListingCreated', {
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
