import fetch from 'cross-fetch'
import MapCache from 'map-cache'
import FormData from 'form-data'
import IPFS_API from 'ipfs-api'
import { IPFS_CONFIG } from '../../config'

const ipfs = IPFS_API(IPFS_CONFIG.initObj)

/**
 * reason for using async function: to use try catch
 * TODO: use mapCache module
 * */

export const IPFS = {
    async saveObjAsFile (obj) {
        let file
        if(typeof Blob === 'undefined'){
            file = Buffer.from(JSON.stringify(obj))
        } else {
            file = new Blob([JSON.stringify(obj)])
        }

        const ipfsHash = await this.saveFile(file)
        return ipfsHash
    },
    async saveFile (file) {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const rawRes = await fetch(`${IPFS_CONFIG.api}/api/v0/add`, {
                method: 'POST',
                body: formData
            })
            // await why?
            const result = await rawRes.json()
            return result.Hash
        } catch (err) {
            throw new Error('Failure to submit file to IPFS', err)
        }
    },
    async loadObjFromFile (ipfsHash) {
        const response = await this.loadFile(ipfsHash)
        const obj = response.json()
        return obj
    },
    async loadFile (ipfsHash) {
        try {
            return await fetch(this.getewayUrlForHash(ipfsHash))
        } catch (err) {
            throw new Error('Failure to get IPFS file', err)
        }
    },
    getewayUrlForHash (ipfsHashStr) {
        return `${IPFS_CONFIG.gateway}/ipfs/${ipfsHashStr}`
    }
}
