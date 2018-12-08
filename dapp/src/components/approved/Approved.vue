<template>
    <div>
        <search-bar/>
        <listings/>
        <post-modal/>
        <buy-modal/>
    </div>
</template>

<script>
    import SearchBar from './SearchBar'
    import Listings from './Listings'
    import PostModal from './PostModal'
    import BuyModal from './BuyModal'
    export default {
        name: 'approved',
        components: {
            SearchBar,
            Listings,
            PostModal,
            BuyModal
        }
    }

</script>

