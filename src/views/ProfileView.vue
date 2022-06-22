<template>
  <div>
    <div v-if="editLock">
      <p>id: {{ profile.id }}</p>
      <p>name: {{ profile.name }}</p>
      <p>phone: {{ profile.phone }}</p>
    </div>
    <div v-else>
      <p>id: {{ profile.id }}</p>
      <p>name: <input class="form-control" type="text" v-model="profile.name" /></p>
      <p>phone: <input class="form-control" type="text" v-model="profile.phone" /></p>
    </div>
    <div class="text-center">
      <div class="btn-group">
        <button class="btn btn-primary" @click="editLock = !editLock">編輯</button>
        <button class="btn btn-success" v-if="!editLock" @click="editUserProfile(profile)">確認</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'

export default {
  setup() {
    let profile = reactive({
      id: '',
      name: '',
      phone: ''
    })
    let editLock = ref(true)

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
            // window.console.log(res)
            // profile.value = res.data
            Object.assign(profile, res.data)
            window.console.log(profile)
          })
          .catch((err) => {
            window.console.log(err)
          })
      }
    }
    async function editUserProfile() {
      await axios
        .put('https://api.nizw0.com/users/', {
          userId: profile.id,
          name: profile.name,
          phone: profile.phone
        })
        .then((res) => {
          Object.assign(profile, res)
          window.console.log(res)
        })
        .catch((err) => {
          window.console.log(err)
        })
      editLock.value = true
    }

    onMounted(async () => fetchUserProfile())
    return { profile, editLock, editUserProfile }
  }
}
</script>

<style scoped></style>
