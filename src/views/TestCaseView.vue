<template>
  <div>
    <div>
      輸入測資編號︰
      <input type="text" v-model="testCase.id" /><br />
      輸入題目編號︰
      <input type="text" v-model="testCase.problemId" />
      <button @click="fetchTestCase(testCase.id, testCase.problemId)">送出</button>
    </div>
    <div v-if="editLock">
      <p>id: {{ testCase.id }}</p>
      <p>problem id: {{ testCase.problemId }}</p>
      <p>input: {{ testCase.input }}</p>
      <p>output: {{ testCase.output }}</p>
    </div>
    <div v-else>
      <p>id: <input type="text" v-model="testCase.id" /></p>
      <p>problem id: <input type="text" v-model="testCase.problemId" /></p>
      <p>input: <input type="text" v-model="testCase.input" /></p>
      <p>output: <input type="text" v-model="testCase.output" /></p>
    </div>
    <button @click="editLock = !editLock">編輯</button>
    <button v-if="!editLock" @click="editTestCase(testCase.id)">確認</button>
    <button v-if="!editLock" @click="createTestCase(testCase.id)">新增</button>
  </div>
</template>

<script>
import axios from 'axios'
import { reactive, ref } from 'vue'

export default {
  setup() {
    let testCase = reactive({
      id: '',
      problemId: '',
      input: '',
      output: ''
    })
    let editLock = ref(true)

    async function fetchTestCase(testCaseId, problemId) {
      if (testCaseId.value !== null) {
        await axios
          .get('https://api.nizw0.com/testcases/', { params: { testCaseId, problemId } })
          .then((res) => {
            Object.assign(testCase, res.data[0])
            console.log(testCase)
          })
          .catch((err) => {
            window.console.log(err)
          })
      }
    }
    async function editTestCase() {
      await axios
        .put('https://api.nizw0.com/testcases/', {
          testCaseId: testCase.id,
          problemId: testCase.problemId,
          input: testCase.input,
          output: testCase.output
        })
        .then((res) => {
          Object.assign(testCase, res.data[0])
          window.console.log(testCase)
        })
        .catch((err) => {
          window.console.log(err)
        })
      editLock.value = true
    }
    async function createTestCase() {
      await axios
        .post('https://api.nizw0.com/testcases/', {
          testCaseId: testCase.id,
          problemId: testCase.problemId,
          input: testCase.input,
          output: testCase.output
        })
        .then((res) => {
          Object.assign(testCase, res.data[0])
          window.console.log(testCase)
        })
        .catch((err) => {
          window.console.log(err)
        })
      editLock.value = true
    }

    return { testCase, editLock, fetchTestCase, editTestCase, createTestCase }
  }
}
</script>

<style scoped></style>
