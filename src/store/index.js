import Vue from 'vue'
import Vuex from 'vuex'
import { blockSync, listing } from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        blockSync,
        listing
    }
})
