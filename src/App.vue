<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <div class="container-fluid">
        <RouterLink to="/about">ArchOJ</RouterLink>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink to="/profile">Profile</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/problem">Problem</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/testcase">TestCase</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/submission">Submission</RouterLink>
            </li>
            <ul class="me-auto">
              <li class="nav-item">
                <RouterLink to="/login">Login</RouterLink>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <body>
    <RouterView />
  </body>
</template>

<style>
@import '@/assets/base.css';

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

body {
  align-items: center;
  display: flex;
  justify-content: center;
}
nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 0px solid var(--color-border);
  border: 0;
}
</style>
