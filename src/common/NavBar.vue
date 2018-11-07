<template>
    <!-- toggleable이 있어야 dropdown이 정상적으로 동작 -->
    <!-- size 조절 시 b-collapse 사라지는 문제 -->
    <b-navbar toggleable="md" variant="warning" type="light">
        <b-navbar-brand href="#">DietFoo</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav v-if="$store.state.web3.web3Instance" class="ml-auto">
                <b-nav-form>
                    <b-button size="sm"
                              variant="outline-dark"
                              class="nav-button"
                              @click="foo">글작성
                    </b-button>
                </b-nav-form>

                <b-nav-item-dropdown text="유저 정보" right>
                    <b-dropdown-item href="#">Network: {{ $store.state.web3.networkID }}</b-dropdown-item>
                    <b-dropdown-item href="#">Account: {{ $store.state.web3.coinbase }}</b-dropdown-item>
                    <b-dropdown-item href="#">Balance: {{ $store.state.web3.balance }} Wei</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {
        name: 'nav-bar',
        methods: {
            foo () {
                console.log('foo')
                this.$EventBus.$emit('postFormClicked')
            }
        }
    }
</script>

<style scoped>
    .nav-button {
        margin: auto 5px auto 5px;
    }
</style>
