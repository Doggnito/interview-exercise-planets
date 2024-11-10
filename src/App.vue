<script setup lang="ts">
import { RouterView } from 'vue-router'
import IconLink from './components/shared/IconLink.vue';
</script>

<template>
  <header>
    <h1 class="title">🪐SW Planets🪐</h1>
  </header>
  <main>
    <RouterView />
  </main>
  <footer class="row justify-center q-ma-xl">
    <span class="text-body1 q-mr-sm">Dominik Kapusta</span>
    <IconLink
      href="https://github.com/Doggnito"
      name="img:/src/assets/github-mark-white.svg"
      size="sm"
    />
  </footer>
</template>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 3rem;
  margin: 10px 0;
}
</style>
