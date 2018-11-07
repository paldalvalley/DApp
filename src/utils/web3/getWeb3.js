import Web3 from 'web3'

let getWeb3 = new Promise(async (resolve, reject) => {
    let isUserConnected;
    const web3 = new Web3(window.web3.currentProvider)
    const coinbase = (await web3.eth.getAccounts())[0]
    typeof coinbase === 'undefined'
    ? isUserConnected = false
    : isUserConnected = true

    if (isUserConnected) {
        resolve({
            web3() {
                return web3
            },
            coinbase
        })
    } else {
        reject(new Error('Unable to connect to Metamask'))
    }
}).then(result => {
    return new Promise((resolve, reject) => {
        result.web3().eth.net.getNetworkType((err, networkID) => {
            if(err) {
                reject(new Error('Unable to retrieve network ID'))
            } else {
                result = Object.assign({}, result, { networkID })
                resolve(result)
            }
        })
    })
}).then(result => {
    return new Promise((resolve, reject) => {
        result.web3().eth.getBalance(result.coinbase, (err, balance) => {
            if (err) {
                reject(new Error(`Unable to retrieve balance for address: ${result.coinbase}`))
            } else {
                result = Object.assign({}, result, { balance })
                resolve(result)
            }
        })
    })
})

export default getWeb3
