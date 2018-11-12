import axios from 'axios'

const state = {

}

const mutations = {

}

const actions = {
    async submitSearchForm({ commit }, formData) {
        let url = `http://192.168.0.33:3000/api/search`
        console.log(formData)
        try {
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
        } catch (err) {
            throw err
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
