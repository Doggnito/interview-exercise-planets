<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1 class="title">🪐SW Planets🪐</h1>
  </header>
  <RouterView />
</template>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 3rem;
  margin: 10px 0;
}
</style>
