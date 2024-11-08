<script setup lang="ts">
import type { Planet, PlanetSelected } from '@/interfaces/planet';
import { computed, toRefs, type PropType } from 'vue';
import PlanetSlideVisual from './PlanetSlideVisual.vue';
import PlanetSlideDescription from './PlanetSlideDescription.vue';


const props = defineProps({
  planet: {
    type: Object as PropType<Planet>,
    required: true,
  }
})

const { planet } = toRefs(props);

const planetForDescription = computed(() => getSelectedPlanetProperties(planet.value))
const getSelectedPlanetProperties = ({ name, population, rotation_period, climate, gravity, created, url }: PlanetSelected) => ({ name, population, rotation_period, climate, gravity, created, url })
</script>

<template>
  <div class="carousel__item">
    <PlanetSlideVisual />
    <PlanetSlideDescription :planet="planetForDescription" />
  </div>
</template>

<style lang="scss" scoped>
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: gray;
  color: #fff;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>