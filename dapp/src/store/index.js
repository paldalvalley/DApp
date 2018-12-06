import Vue from 'vue'
import Vuex from 'vuex'
import { blockSync, listing, search } from './modules'
import { listingPlugin } from './plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    blockSync,
    listing,
    search
  },
  plugins: [listingPlugin]
})
