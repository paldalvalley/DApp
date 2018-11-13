import axios from 'axios'

const actions = {
    async submitSearchForm({ commit, rootState  }, formData) {
        let url = `http://13.209.8.64:3000/api/search`

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

            let searchedEvents = await rootState.blockSync
                .contractInstance()
                .getPastEvents('ListingCreated', {
                    filter: { listingID: data },
                    fromBlock: 0,
                    toBlock: 'latest'
                })

            for (let i in searchedEvents) {
                let listingData = allEvents[i].returnValues
                let obj = Object.assign(
                    { listingID: listingData.listingID },
                    { ipfsHash: listingData.ipfsHash },
                    { party: listingData.party })
                listingArray.push(obj)
            }

        } catch (err) {
            throw err
        }
    }
}

export default {
    namespaced: true,
    actions
}
