import IPFS_API from 'ipfs-api'
import { IPFS_CONFIG } from '../../config'
const ipfs = IPFS_API(IPFS_CONFIG)

/**
 * reason for using async function: to use try catch
 * */

export const IPFS = {
    async load () {
        try {
            return await ipfs.files.get(ipfsHash)
        } catch (err) {
            throw new Error(err)
        }
    },
    async saveOne () {
        try {
            let jsonStr = JSON.stringify(json)
            files.push({content: ipfs.types.Buffer.from(jsonStr)})
            return await ipfs.files.add(files)
        } catch (err) {
            throw new Error(err)
        }
    },
    async saveMany () {
        try {
            let files = []
            jsonArray.forEach(json => {
                let jsonStr = JSON.stringify(json)
                files.push({content: ipfs.types.Buffer.from(jsonStr)})
            })
            return await ipfs.files.add(files)
        } catch (err) {
            throw new Error(err)
        }
    }
}
