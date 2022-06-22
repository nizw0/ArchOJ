<template>
  <div>
    <div>
      輸入繳交編號︰
      <input class="form-control" type="text" v-model="submission.id" /><br />
    </div>
    <div v-if="editLock">
      <p>id: {{ submission.id }}</p>
      <p>problem id: {{ submission.problem_id }}</p>
      <p>code: {{ submission.code }}</p>
      <p>language: {{ submission.language }}</p>
      <p>status: {{ submission.status }}</p>
      <p>result: {{ submission.result }}</p>
    </div>
    <div v-else>
      <p>id: <input class="form-control" type="text" v-model="submission.id" /></p>
      <p>problem id: <input class="form-control" type="text" v-model="submission.problem_id" /></p>
      <p>code: <input class="form-control" type="text" v-model="submission.code" /></p>
      <p>language: <input class="form-control" type="text" v-model="submission.language" /></p>
      <p>status: {{ submission.status }}</p>
      <p>result: {{ submission.result }}</p>
    </div>
    <div class="text-center">
      <div class="btn-group">
        <button class="btn btn-success" @click="fetchSubmission(submission.id, submission.problem_id)">送出</button>
        <button class="btn btn-primary" @click="editLock = !editLock">編輯</button>
        <button class="btn btn-warning" v-if="!editLock" @click="createSubmission(submission.id)">確認</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { reactive, ref } from 'vue'

export default {
  setup() {
    let submission = reactive({
      id: '',
      code: '',
      language: '',
      problem_id: '',
      status: '',
      result: ''
    })
    let editLock = ref(true)

    async function fetchSubmission(submissionId) {
      if (submissionId.value !== null) {
        await axios
          .get('https://api.nizw0.com/submissions/', { params: { submissionId } })
          .then((res) => {
            Object.assign(submission, res.data[0])
            console.log(submission)
          })
          .catch((err) => {
            window.console.log(err)
          })
      }
    }
    async function createSubmission() {
      await axios
        .post('https://api.nizw0.com/submissions/', {
          submissionId: submission.id,
          code: submission.code,
          language: submission.language,
          problemId: submission.problem_id
        })
        .then((res) => {
          Object.assign(submission, res.data)
          window.console.log(submission)
        })
        .catch((err) => {
          window.console.log(err)
        })
      editLock.value = true
    }

    return { submission, editLock, fetchSubmission, createSubmission }
  }
}
</script>

<style scoped></style>
