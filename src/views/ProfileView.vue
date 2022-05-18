<template>
  <div>
    <p>id: {{ profile.id }}</p>
    <p>name: {{ profile.name }}</p>
    <p>phone: {{ profile.phone }}</p>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {
  setup() {
    const profile = ref({})

    async function fetchUserProfile() {
      const userId = await Auth.currentUserInfo()
        .then((res) => {
          return res.attributes.sub
        })
        .catch((err) => {
          window.console.log(err)
          return null
        })
      if (userId !== null) {
        axios
          .get('https://api.nizw0.com/users/', { params: { userId } })
          .then((res) => {
            window.console.log(res)
            profile.value = res.data
          })
          .catch((err) => {
            window.console.log(err)
          })
      }
    }

    onMounted(async () => fetchUserProfile())
    return { profile }
  }
}
</script>

<style scoped></style>
