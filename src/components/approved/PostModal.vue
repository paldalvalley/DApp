<template>
    <div>
        <b-modal ref="createForm" size="lg" hide-footer title="정보 입력">
            <!-- 입력 안된 경우 예외처리 -->
            <!-- 모달 child component로 빼기 -->
            <form @submit.prevent="submitForm(formData)">
                <b-container fluid>
                    <b-row class="my-1">
                        <b-col sm="2"><label for="input-none">닉네임:</label></b-col>
                        <b-col sm="9">
                            <b-form-input id="input-none"
                                          type="text"
                                          v-model="formData.nickname">
                            </b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="my-1">
                        <b-col sm="2"><label for="input-valid">나이({{ formData.age }}):</label></b-col>
                        <b-col sm="9">
                            <b-form-input id="input-valid"
                                          type="range"
                                          min="13"
                                          max="100"
                                          v-model="formData.age">
                            </b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="my-1">
                        <b-col sm="2"><label for="input-valid">키({{ formData.height }}):</label></b-col>
                        <b-col sm="9">
                            <b-form-input id="input-valid"
                                          type="range"
                                          min="140"
                                          max="200"
                                          v-model="formData.height">
                            </b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="my-1">
                        <b-col sm="2"><label for="input-valid">몸무게({{ formData.weight }}):</label></b-col>
                        <b-col sm="9">
                            <b-form-input id="input-valid"
                                          type="range"
                                          min="30"
                                          max="200"
                                          v-model="formData.weight">
                            </b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="my-1">
                        <b-col sm="2"><label for="input-invalid">내용:</label></b-col>
                        <b-col sm="9">
                            <b-form-textarea id="report-desc"
                                             placeholder="다이어트에 관한 내용을 상세히 입력해주세요."
                                             :rows="3"
                                             :max-rows="6"
                                             v-model="formData.description">
                            </b-form-textarea>
                        </b-col>
                    </b-row>
                    <b-form-radio-group id="radios2" v-model="formData.sex" name="radioSubComponent">
                        <b-form-radio value="0">여성</b-form-radio>
                        <b-form-radio value="1">남성</b-form-radio>
                    </b-form-radio-group>
                    <input type="submit" id="submit" value="작성">
                </b-container>
            </form>
        </b-modal>
    </div>
</template>

<script>
    import { saveOneIntoIPFS } from '../../utils/ipfs/ipfs-service'

    export default {
        data () {
            return {
                formData: {
                    title: '',
                    description: '',
                    nickname: '',
                    age: 0,
                    sex: -1,
                    height: 0,
                    weight: 0
                }
            }
        },
        methods: {
            triggerPostForm () {
                this.$refs.createForm.show()
            },
            submitForm(formData) {

            }
        },
        created () {
            this.$EventBus.$on('postFormClicked', this.triggerPostForm)
        }
    }
</script>
