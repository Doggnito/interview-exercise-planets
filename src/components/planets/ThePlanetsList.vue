<script setup lang="ts">
import type { Planet } from '@/interfaces/planet';
import type { PropType } from 'vue';
import PlanetSlide from '@/components/planets/planet/PlanetSlide.vue';

defineProps({
  /** Array of planets, displaying as list */
  planetsList: {
    type: Array as PropType<Planet[]>,
    required: true,
  }
})
</script>
 
<template>
  <ul class="list">
    <li v-for="(planet, planetIndex) in planetsList" :key="planetIndex" class="list__item">
      <PlanetSlide :planet="planet"/>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 40px;
  margin: 0 20px 20px;

  &__item {
    min-height: 600px;
    width: 320px;
  }
}
</style>