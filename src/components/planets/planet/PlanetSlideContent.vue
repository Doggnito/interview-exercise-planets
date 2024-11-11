<script setup lang="ts">
import type { PlanetPropsContent, PlanetPropsDescription } from '@/interfaces/planet';
import type { Entries } from '@/interfaces/utils';
import { formatNumericWithSpaces, firstToUpperCase, replaceDashesWithSpaces, snakeToCamel } from '@/utils';
import { computed, type PropType } from 'vue';
import IconLink from '@/components/shared/IconLink.vue';

const props = defineProps({
  /** The single planet object containing part of Planet data - population, rotation_period: string, climate, gravity, created, name, url */
  planet: {
    type: Object as PropType<PlanetPropsContent>,
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

const preparePlanetData = (planet: PlanetPropsDescription) => {
  delete planet.name;
  delete planet.url;
  return (Object.entries(planet) as Entries<Omit<PlanetPropsContent, 'name' | 'url'>>).map(([key, value]) => {
    value = value.trim();
    if (key === 'population') {
      value = formatNumericWithSpaces(value);
    };
    if (key === 'created') {
      const date = (new Date(value)).toLocaleString("pl-PL");
      value = date !== 'Invalid Date' ? date : '-';
    };
    const label = replaceDashesWithSpaces(firstToUpperCase((key)));
    return [key, label, value];
  });
}
</script>

<template>
  <div>
    <div class="relative">
      <h2 v-text="planetName" class="planet-name" data-testId="planetName" />
      <IconLink
        v-if="planetUrl"
        :href="planetUrl"
        name="open_in_new"
        size="sm"
        class="link"
        data-testId="planetUrlIcon"
      />
    </div>
    <ul class="description">
      <li v-for="([propertyKey, label, value], index) in planetModified" :key="index" class="description__item">
        <span>{{ label }}: </span>
        <span v-text="value" class="text-right" :data-testid="`${snakeToCamel(propertyKey)}Value`" />
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
