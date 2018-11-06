import Web3 from 'web3'
import store from '../store'

const pollWeb3 = state => {
    let web3 = new Web3(window.web3.currentProvider)

    setInterval(async () => {
        if(web3 && store.state.web3.web3Instance) {
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
            web3.eth.getBalance(store.state.web3.coinbase, (err, polledBalance) => {
                if (err) {
                    // 수정 필요
                    console.log(err)
                } else if (parseInt(polledBalance, 10) !== store.state.web3.balance) {
                    store.commit('pollWeb3Instance', {
                        coinbase: store.state.web3.coinbase,
                        balance: parseInt(polledBalance, 10)
                    })
                }
            })
        }
    }, 500)
}

export default pollWeb3

// const web3 = new Web3(window.web3.currentProvider)
// let account = (await web3.eth.getAccounts())[0]
// console.log(account)
// let accountInterval = setInterval(async () => {
//     let newAccount = (await web3.eth.getAccounts())[0]
//     console.log(newAccount)
//     if(newAccount !== account) {
//         account = newAccount
//         resolve(account)
//     }
// }, 100)
//
// accountInterval


