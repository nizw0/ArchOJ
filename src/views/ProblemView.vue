<template>
  <div>
    <div>
      輸入題目編號︰
      <input class="form-control" type="text" v-model="problem.id" />
    </div>
    <div v-if="editLock">
      <p>id: {{ problem.id }}</p>
      <p>description: {{ problem.description }}</p>
    </div>
    <div v-else>
      <p>id: {{ problem.id }}</p>
      <p>description: <input class="form-control" type="text" v-model="problem.description" /></p>
    </div>
    <div class="text-center">
      <div class="btn-group">
        <button class="btn btn-success" @click="fetchProblem(problem.id)">送出</button>
        <button class="btn btn-primary" @click="editLock = !editLock">編輯</button>
        <button class="btn btn-warning" v-if="!editLock" @click="editProblem(problem.id)">確認</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { reactive, ref } from 'vue'

export default {
  setup() {
    let problem = reactive({
      id: '',
      description: ''
    })
    let editLock = ref(true)

    async function fetchProblem(problemId) {
      if (problemId.value !== null) {
        await axios
          .get('https://api.nizw0.com/problems/', { params: { problemId } })
          .then((res) => {
            // problem.value = res.data
            Object.assign(problem, res.data)
            console.log(problem)
          })
          .catch((err) => {
            window.console.log(err)
          })
      }
    }
    async function editProblem() {
      await axios
        .put('https://api.nizw0.com/problems/', {
          problemId: problem.id,
          description: problem.description
        })
        .then((res) => {
          Object.assign(problem, res.data)
          window.console.log(problem)
        })
        .catch((err) => {
          window.console.log(err)
        })
      editLock.value = true
    }

    return { problem, editLock, fetchProblem, editProblem }
  }
}
</script>

<style scoped></style>
