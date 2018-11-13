import axios from 'axios'

const actions = {
    async loadSearchedListings({ commit }, formData) {
        const url = `http://13.209.8.64:3000/api/search`
        const eventName = 'ListingCreated'

        try {
            // ajax to database server
            const { data } = await axios.post(url, {
                content: {
                    age: formData.ageSelected,
                    sex: formData.sexSelected,
                    height_min: formData.height.from,
                    height_max: formData.height.to,
                    weight_min: formData.weight.from,
                    weight_max: formData.weight.to
                }
            })

            console.log(data)

            const filter = { listingID: data }
            const listingArray = await this.getEventsFromBlock(eventName, filter)

            commit('listing/setListingArray', listingArray, { root: true })
        } catch (err) {
            throw err
        }
    }
}

export default {
    namespaced: true,
    actions
}
