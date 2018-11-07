<template>
    <div>
        <listings/>
        <post-modal/>
    </div>
</template>

<script>
    import Listings from './Listings'
    import PostModal from './PostModal'
    export default {
        name: 'approved',
        components: {
            Listings,
            PostModal
        }
    }

</script>

