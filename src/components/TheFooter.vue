<script setup lang="ts">
import IconLink from '@/components/shared/IconLink.vue';

const githubUrl = new URL('/src/assets/github-mark-white.svg', import.meta.url).href
</script>

<template>
  <footer class="row justify-center q-ma-xl">
    <span class="text-body1 q-mr-sm">Dominik Kapusta</span>
    <IconLink
      href="https://github.com/Doggnito"
      :name="`img:${githubUrl}`"
      size="sm"
    />
  </footer>
</template>
