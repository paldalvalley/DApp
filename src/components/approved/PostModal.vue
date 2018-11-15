<template>
    <div>
        <b-modal ref="createForm" size="lg" hide-footer title="정보 입력">
            <!-- 입력 안된 경우 예외처리 -->
            <!-- 모달 child component로 빼기 -->
            <form @submit.prevent="submitForm(formData)">
                <b-container fluid>
                    <b-row class="my-1">
                        <b-col sm="2"><label for="input-nickname">닉네임:</label></b-col>
                        <b-col sm="9">
                            <b-form-input id="input-nickname"
                                          type="text"
                                          v-model="formData.nickname">
                            </b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="my-1">
                        <b-col sm="2"><label for="input-age">나이({{ formData.age }}):</label></b-col>
                        <b-col sm="9">
                            <b-form-input id="input-age"
                                          type="range"
                                          min="13"
                                          max="100"
                                          v-model.number="formData.age">
                            </b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="my-1">
                        <b-col sm="2"><label for="input-height">키({{ formData.height }}):</label></b-col>
                        <b-col sm="9">
                            <b-form-input id="input-height"
                                          type="range"
                                          min="140"
                                          max="200"
                                          v-model.number="formData.height">
                            </b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="my-1">
                        <b-col sm="2"><label for="input-weight">몸무게({{ formData.weight }}):</label></b-col>
                        <b-col sm="9">
                            <b-form-input id="input-weight"
                                          type="range"
                                          min="30"
                                          max="200"
                                          v-model.number="formData.weight">
                            </b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="my-1">
                        <b-col sm="2"><label for="input-title">제목:</label></b-col>
                        <b-col sm="9">
                            <b-form-input id="input-title"
                                          type="text"
                                          v-model="formData.title">
                            </b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="my-1">
                        <b-col sm="2"><label for="input-desc">내용:</label></b-col>
                        <b-col sm="9">
                            <b-form-textarea id="report-desc"
                                             placeholder="다이어트에 관한 내용을 상세히 입력해주세요."
                                             :rows="3"
                                             :max-rows="6"
                                             v-model="formData.description">
                            </b-form-textarea>
                        </b-col>
                    </b-row>
                    <b-form-radio-group id="radios" v-model="formData.sex" name="radioSubComponent">
                        <b-form-radio :value="0">여성</b-form-radio>
                        <b-form-radio :value="1">남성</b-form-radio>
                    </b-form-radio-group>
                    <input type="submit" id="submit" value="작성">
                </b-container>
            </form>
        </b-modal>
    </div>
</template>

<script>
    import { lib } from '../../modules/lib'
    import { mapState } from 'vuex'
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
        computed: {
            ...mapState('blockSync', [
                'web3',
                'contractInstance'
            ]),
            contractMethods () {
                return this.contractInstance().methods
            }
        },
        methods: {
            triggerPostForm () {
                this.$refs.createForm.show()
            },
            async submitForm(formData) {
                let formInstance = this.assignFormInstance(formData)
                let ipfsHash = await lib.ipfsService.saveObjAsFile(formInstance)
                this.$refs.createForm.hide()
                this.createListing(ipfsHash)

                // * test load
                // let result = await lib.ipfsService.loadObjFromFile('QmXGQjjQKEiZDE9i7WcB8uwfQuAgEokFFQSw6KkAQvZnPM')
                // console.log(result)
            },
            async createListing (ipfsHash) {
                try {
                    let result = await this.contractMethods.createListing(ipfsHash).send({
                        gas: 1000000,
                        value: 0,
                        from: this.web3.coinbase
                    })
                    console.log(result)
                } catch (err) {
                    throw console.error(err)
                }
            },
            assignFormInstance (formData) {
                let formInstance = Object.assign({}, formData)
                this.clearForm()
                return formInstance
            },
            clearForm () {
                    this.formData.title = ''
                    this.formData.description = ''
                    this.formData.nickname = ''
                    this.formData.age = 0
                    this.formData.sex = -1
                    this.formData.height = 0
                    this.formData.weight = 0
            }
        },
        mounted () {
            this.$EventBus.$on('postFormClicked', this.triggerPostForm)
        }
    }
</script>
