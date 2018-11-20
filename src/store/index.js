import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { blockSync, listing, search } from './modules'
import { listingPlugin } from './plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    blockSync,
    listing,
    search
  },
  plugins: [listingPlugin],
  actions: {
    async triggerListener () {
      const { data } = await axios.post('http://192.168.0.34:3000/api/create', {})
      return data
    }
  }
})
