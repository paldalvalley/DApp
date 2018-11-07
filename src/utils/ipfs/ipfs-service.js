import IPFS from 'ipfs-api'
import { IPFS_CONFIG } from '../../config'
const ipfs = IPFS(IPFS_CONFIG)

/**
 * reason for using async function: to use try catch
 * */

export const loadFromIPFS = async ipfsHash => {
    try {
        return await ipfs.files.get(ipfsHash)
    } catch (err) {
        throw new Error(err)
    }
}

export const saveOneIntoIPFS = async json => {
    try {
        let jsonStr = JSON.stringify(json)
        files.push({content: ipfs.types.Buffer.from(jsonStr)})
        return await ipfs.files.add(files)
    } catch (err) {
        throw new Error(err)
    }
}

export const saveManyIntoIPFS = async jsonArray => {
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
