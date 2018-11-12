<template>
    <div class="container">
        <form @submit.prevent="submitForm(formData)">
            <b-form-select v-model="formData.ageSelected" class="mb-3">
                <template slot="first">
                    <!-- this slot appears above the options from 'options' prop -->
                    <option :value="null" disabled>연령대를 선택해주세요.</option>
                </template>
                <!-- these options will appear after the ones from 'options' prop -->
                <option :value="-1">모든 연령</option>
                <option :value="20">20대</option>
                <option :value="30">30대</option>
                <option :value="40">40대</option>
                <option :value="50">50대</option>
                <option :value="60">60대</option>
                <option :value="70">70대</option>
                <option :value="80">80대</option>
            </b-form-select>
            <b-form-select v-model="formData.sexSelected" class="mb-3">
                <template slot="first">
                    <!-- this slot appears above the options from 'options' prop -->
                    <option :value="null" disabled>성별을 선택해주세요.</option>
                </template>
                <!-- these options will appear after the ones from 'options' prop -->
                <option :value="-1">공통</option>
                <option :value="0">여성</option>
                <option :value="1">남성</option>
            </b-form-select>


            <b-row class="my-1">
                <b-col sm="2"><label for="input-height">신장:</label></b-col>
                <b-row sm="9">
                    <b-form-input id="input-height-from"
                                  type="text"
                                  v-model="formData.height.from">
                    </b-form-input>
                    <b-form-input id="input-height-to"
                                  type="text"
                                  v-model="formData.height.to">
                    </b-form-input>
                </b-row>
            </b-row>

            <b-row class="my-1">
                <b-col sm="2"><label for="input-weight">몸무게:</label></b-col>
                <b-row sm="9">
                    <b-form-input id="input-weight-from"
                                  type="text"
                                  v-model="formData.weight.from">
                    </b-form-input>
                    <b-form-input id="input-weight-to"
                                  type="text"
                                  v-model="formData.weight.to">
                    </b-form-input>
                </b-row>
            </b-row>
            <input type="submit" id="submit" value="검색">
        </form>
        {{ formData.ageSelected }}
        {{ typeof formData.ageSelected }}
        {{ formData.sexSelected }}
        {{ typeof formData.sexSelected }}
        {{ formData.height.from }}
        {{ typeof formData.height.from }}
        {{ formData.height.to }}
        {{ typeof formData.height.to }}
        {{ formData.weight.from }}
        {{ typeof formData.weight.from }}
        {{ formData.weight.to }}
        {{ typeof formData.weight.to }}
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        data () {
            return {
                formData: {
                    ageSelected: null,
                    sexSelected: null,
                    height: {
                        from: null,
                        to: null
                    },
                    weight: {
                        from: null,
                        to: null
                    }
                }
            }
        },
        methods: {
            ...mapActions('search', [
                'submitSearchForm'
            ]),
            async submitForm(formData) {
                this.toNumber(formData)
                this.submitSearchForm(formData)
                this.clearForm()
            },
            clearForm() {
                // default 값 설정하는 미들웨어 만들기
                this.ageSelected = null
                this.sexSelected = null
                this.formData.height.from = null
                this.formData.height.to = null
                this.formData.weight.from = null
                this.formData.weight.to = null
            },
            toNumber (formData) {
                formData.height.from = parseInt(formData.height.from)
                formData.height.to = parseInt(formData.height.to)
                formData.weight.from = parseInt(formData.weight.from)
                formData.weight.to = parseInt(formData.weight.to)
            }
        }
    }

</script>

<style scoped>
</style>
