<template>
  <div>
    <div>
      輸入題目編號︰
      <input type="text" v-model="problemId" />
      <button @click="fetchProblem(problemId)">送出</button>
    </div>
    <div v-if="problem !== null">
      <p>id: {{ problem.id }}</p>
      <p>description: {{ problem.description }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'

export default {
  setup() {
    const problemId = ref(null)
    const problem = ref(null)

    async function fetchProblem(problemId) {
      if (problemId.value !== null) {
        await axios
          .get('https://api.nizw0.com/problems/', { params: { problemId } })
          .then((res) => {
            problem.value = res.data
            console.log(problem)
          })
          .catch((err) => {
            window.console.log(err)
          })
      }
    }
    return { problemId, problem, fetchProblem }
  }
}
</script>

<style scoped></style>
