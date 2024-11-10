<script setup lang="ts">
import type { PlanetPropsForDescription } from '@/interfaces/planet';
import type { Entries } from '@/interfaces/utils';
import { addSpacesToNumber, firstToUpperCase, replaceDashesWithSpaces } from '@/utils';
import { computed, type PropType } from 'vue';
import IconLink from '@/components/shared/IconLink.vue';

const props = defineProps({
  planet: {
    type: Object as PropType<PlanetPropsForDescription>,
    required: true,
  }
})

const planetModified = computed(() => {
  return preparePlanetData(props.planet);
})

const planetName = computed(() => {
  return props.planet.name;
})

const planetUrl = computed(() => {
  return props.planet.url;
})

const preparePlanetData = (planet: PlanetPropsForDescription) => {
  delete planet.name;
  delete planet.url;
  return (Object.entries(planet) as Entries<Omit<PlanetPropsForDescription, 'name' | 'url'>>).map(([key, value]) => {
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
  <div>
    <div class="relative">
      <h2 v-text="planetName" class="planet-name" />
      <IconLink
        v-if="planetUrl"
        :href="planetUrl"
        name="open_in_new"
        size="sm"
        class="link"
      />
    </div>
    <ul class="description">
      <li v-for="([propertyKey, value], index) in planetModified" :key="index" class="description__item">
        <span>{{ propertyKey }}: </span>
        <span v-text="value" class="text-right" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.planet-name {
  margin-bottom: 10px;
  text-align: center;
  font-size: 2.5rem;
}

.link {
  position: absolute;
  right: 20px;
  top: 0;
  transform: translateY(-50%);
}

.description {
  margin: 0 20px 20px;

  &__item {
    display: flex;
    justify-content: space-between;
    color: $grey-5;
  }
}
</style>
