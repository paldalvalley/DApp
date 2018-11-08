<template>
    <!-- toggleable이 있어야 dropdown이 정상적으로 동작 -->
    <!-- size 조절 시 b-collapse 사라지는 문제 -->
    <b-navbar toggleable="md" variant="warning" type="light">
        <b-navbar-brand href="#">DietFoo</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav v-if="web3.web3Instance" class="ml-auto">
                <b-nav-form>
                    <b-button size="sm"
                              variant="outline-dark"
                              class="nav-button"
                              @click="triggerPostForm">글작성
                    </b-button>
                </b-nav-form>

                <b-nav-item-dropdown text="유저 정보" right>
                    <b-dropdown-item href="#">Network: {{ web3.networkID }}</b-dropdown-item>
                    <b-dropdown-item href="#">Account: {{ web3.coinbase }}</b-dropdown-item>
                    <b-dropdown-item href="#">Balance: {{ web3.balance }} Wei</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</template>

<script>
    import mapGetters from 'vuex'
    export default {
        name: 'nav-bar',
        methods: {
            triggerPostForm () {
                this.$EventBus.$emit('postFormClicked')
            }
        },
        computed: {
            ...mapGetters([
                'web3'
            ])
        }
    }
</script>

<style scoped>
    .nav-button {
        margin: auto 5px auto 5px;
    }
</style>
