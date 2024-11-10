<script setup lang="ts">
import ThePlanetsSearch from '@/components/planets/filters/ThePlanetsSearch.vue';
import { DEFAULT_CURRENT_PAGE } from '@/components/planets/constant';
import ThePlanetsSort from '@/components/planets/filters/ThePlanetsSort.vue';
import ThePlanetsSortOrder from '@/components/planets/filters/ThePlanetsSortOrder.vue';
import ThePlanetsResetFilters from '@/components/planets/filters/ThePlanetsResetFilters.vue';

const emit = defineEmits<{
  (e: 'refreshPlanets', page: number): void;
}>();
</script>

<template>
  <div class="row justify-center items-center q-gutter-md q-mb-md">
    <ThePlanetsSearch @filterPlanets="emit('refreshPlanets', DEFAULT_CURRENT_PAGE)" />
    <ThePlanetsSort />
    <ThePlanetsSortOrder />
    <ThePlanetsResetFilters />
  </div>
</template>

