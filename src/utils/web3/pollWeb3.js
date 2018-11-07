import Web3 from 'web3'
import store from '../../store'

const pollWeb3 = state => {
    let web3 = new Web3(window.web3.currentProvider)

    setInterval(async () => {
        if (typeof (await web3.eth.getAccounts())[0] === 'undefined') {
            store.commit('resetWeb3Instance')
        } else if (state.web3.web3Instance) {
            if ((await web3.eth.getAccounts())[0] !== store.state.web3.coinbase) {
                let newCoinbase = (await web3.eth.getAccounts())[0]
                web3.eth.getBalance(newCoinbase, (err, newBalance) => {
                    if (err) {
                        // 수정 필요
                        console.log(err)
                    } else {
                        store.commit('pollWeb3Instance', {
                            coinbase: newCoinbase,
                            balance: parseInt(newBalance, 10)
                        })
                    }
                })
            }
        } else {
            let web3Copy = state.web3
            web3Copy.web3Instance = () => web3
            web3Copy.networkID = await web3.eth.net.getNetworkType()
            web3Copy.coinbase = (await web3.eth.getAccounts())[0]
            web3Copy.balance =  await web3.eth.getBalance(state.web3.coinbase)
            state.web3 = web3Copy
        }
    }, 2000)
}

export default pollWeb3

