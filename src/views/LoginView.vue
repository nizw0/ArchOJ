<template>
  <div>
    <authenticator>
      <template v-slot="{ user, signOut }">
        <h1>Hello! {{ user.username }}</h1>
        <div class="text-center">
          <button class="btn btn-secondary" @click="signOut">Sign Out</button>
        </div>
      </template>
    </authenticator>
  </div>
</template>

<script setup>
import { Authenticator } from '@aws-amplify/ui-vue'
import '@aws-amplify/ui-vue/styles.css'
</script>

<style scoped></style>
