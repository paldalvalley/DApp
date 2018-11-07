<template>
    <div id="app">
        <div>
            <!-- toggleable이 있어야 dropdown이 정상적으로 동작 -->

            <!-- size 조절 시 b-collapse 사라지는 문제 -->
            <b-navbar toggleable="md" variant="warning" type="light">
                <b-navbar-brand href="#">DietFoo</b-navbar-brand>

                <b-collapse is-nav id="nav_collapse">

                    <b-navbar-nav v-if="$store.state.web3.web3Instance" class="ml-auto">
                        <b-nav-item-dropdown text="유저 정보" right>
                            <b-dropdown-item href="#">Network: {{ $store.state.web3.networkID }}</b-dropdown-item>
                            <b-dropdown-item href="#">Account: {{ $store.state.web3.coinbase }}</b-dropdown-item>
                            <b-dropdown-item href="#">Balance: {{ $store.state.web3.balance }} Wei</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>

                </b-collapse>

            </b-navbar>
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        created () {
            this.$store.dispatch('checkWeb3')
        }
    }
</script>

<style>
    #app {
        text-align: center;
    }
</style>
