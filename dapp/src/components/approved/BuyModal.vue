<template>
    <div>
        <b-modal ref="createForm" size="lg" hide-footer title="닫기">
            <form @submit.prevent="submitForm(formData)">
                <b-container fluid>
                    <p>안녕</p>
                </b-container>
            </form>
        </b-modal>
    </div>
</template>

<script>
  export default {
    methods: {
      triggerBuyForm () {
        this.$refs.createForm.show()
      }
    },
    mounted() {
      this.$EventBus.$on('buyButtonClicked', this.triggerBuyForm)
    }
  }
</script>
