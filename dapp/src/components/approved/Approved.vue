<template>
    <div>
        <search-bar/>
        <listings/>
        <post-modal/>
    </div>
</template>

<script>
    import SearchBar from './SearchBar'
    import Listings from './Listings'
    import PostModal from './PostModal'
    export default {
        name: 'approved',
        components: {
            SearchBar,
            Listings,
            PostModal
        }
    }

</script>

