<script lang="ts" setup>
defineProps({
  /** URL of the page the icon link goes to */
  href: {
    type: String,
    required: true,
  },
  /** Icon name (material icons package) or custom path with prefix img: (for custom remember of static asset handling https://vite.dev/guide/assets#new-url-url-import-meta-url )*/
  name: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <q-icon
    v-bind:href
    v-bind:name
    class="icon cursor-pointer"
    tag="a"
    target="_blank"
  />
</template>

<style lang="scss" scoped>
.icon {
  color: $grey-6;
  
  &:hover {
    color: $primary;
  }
}
</style>