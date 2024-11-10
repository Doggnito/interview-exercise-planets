<script lang="ts" setup>
defineProps({
  href: {
    type: String,
    required: true,
  },
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