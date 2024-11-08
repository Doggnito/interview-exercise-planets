<script setup lang="ts">
import type { PlanetSelected } from '@/interfaces/planet';
import type { Entries } from '@/interfaces/utils';
import { addSpacesToNumber, firstToUpperCase, replaceDashesWithSpaces } from '@/utils';
import { computed, type PropType } from 'vue';


const props = defineProps({
  planet: {
    type: Object as PropType<PlanetSelected>,
    required: true,
  }
})

const planetModified = computed(() => {
  return preparePlanetData(props.planet);
})

const planetName = computed(() => {
  return props.planet.name;
})


const preparePlanetData = (planet: PlanetSelected) => {
  delete planet.name;
  return (Object.entries(planet) as Entries<Omit<PlanetSelected, 'name'>>).map(([key, value]) => {
    value = value.trim();
    if (key === 'population') {
      value = addSpacesToNumber(value);
    };
    if (key === 'created') {
      const date = new Date(value);
      value = date.toLocaleString("pl-PL");
    };
    (key as string) = replaceDashesWithSpaces(firstToUpperCase((key)));
    return [key, value];
  });
}

</script>

<template>
  <h2 v-text="planetName" />
  <ul class="planet">
    <li v-for="([propertyKey, value], index) in planetModified" :key="index">
      <span>{{ propertyKey }}: </span>
      <span>{{ value }}</span>
    </li>
  </ul>
</template>
