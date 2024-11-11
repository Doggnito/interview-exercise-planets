<script setup lang="ts">
import type { Planet, PlanetPropsContent } from '@/interfaces/planet';
import { computed, toRefs, type PropType } from 'vue';
import PlanetSlideVisual from '@/components/planets/planet/PlanetSlideVisual.vue';
import PlanetSlideDescription from '@/components/planets/planet/PlanetSlideContent.vue';

const props = defineProps({
  planet: {
    type: Object as PropType<Planet>,
    required: true,
  }
})

const { planet } = toRefs(props);

const planetForDescription = computed(() => getSelectedPlanetProperties(planet.value))
const getSelectedPlanetProperties = ({ name, population, rotation_period, climate, gravity, created, url }: PlanetPropsContent) => 
  ({ name, population, rotation_period, climate, gravity, created, url });
</script>

<template>
  <div class="planet-slide">
    <PlanetSlideVisual
      :rotationPeriod="planet.rotation_period"
      :terrain="planet.terrain.split(', ')"
      :diameter="planet.diameter"
      class="planet-slide__visual"
    />
    <PlanetSlideDescription :planet="planetForDescription" class="planet-slide__description" />
  </div>
</template>

<style lang="scss" scoped>
.planet-slide {
  position: relative;
  padding-top: 5px;
  min-height: 200px;
  color: #fff;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__description {
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    padding-top: 100px;
    width: 320px;
    border-radius: 28px;
    background-color: $grey-9;
  }

  &__visual {
    position: relative;
    z-index: 1;
  }
}
</style>