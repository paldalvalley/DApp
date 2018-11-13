import { lib } from '../../modules/lib'

export const listingPlugin = store => {
    store.getEventsFromBlock = async (eventName, filter) => {
        let listingArray = []
        const option = {
            fromBlock: 0,
            toBlock: 'latest'
        }

        if (filter) option.filter = filter

        const events = await store.state.blockSync
            .contractInstance()
            .getPastEvents(eventName, option)

        for (let i in events) {
            const listingData = events[i].returnValues
            const obj = Object.assign(
                { listingID: listingData.listingID },
                { ipfsHash: listingData.ipfsHash },
                { party: listingData.party  })
            listingArray.push(obj)
            listingArray[i].data = await lib.ipfsService.loadObjFromFile(listingArray[i].ipfsHash)
        }

        return listingArray
    }
}
