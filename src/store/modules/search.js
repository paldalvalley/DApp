import axios from 'axios'

const actions = {
    async loadSearchedListings({ commit }, formData) {
        const url = `http://13.209.8.64:3000/api/search`
        const eventName = 'ListingCreated'
        console.log(formData.ageSelected)
        console.log(formData.sexSelected)
        console.log(formData.height.from)
        console.log(formData.height.to)
        console.log(formData.weight.from)
        console.log(formData.weight.to)
        try {
            // ajax req to database server
            // get listing id from database
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

            // get listing ipfs hash from blockchain with listing id
            // and get listing data from IPFS with ipfs hash
            let listingArray
            if(data.length) {
                const filter = {listingID: data}
                listingArray = await this.getEventsFromBlock(eventName, filter)
            } else {
                listingArray = []
            }
            commit('listing/setListingArray', listingArray, {root: true})
        } catch (err) {
            throw err
        }
    }
}

export default {
    namespaced: true,
    actions
}
