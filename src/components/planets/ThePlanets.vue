<script setup lang="ts">
import ThePlanetsFilter from '@/components/planets/ThePlanetsFilter.vue';
import ThePlanetsPagination from '@/components/planets/ThePlanetsPagination.vue';
import type { Planet } from '@/interfaces/planet';
import { usePlanetsStore } from '@/stores/planet';
import { onMounted, ref } from 'vue';
import ThePlanetsCarousel from '@/components/planets/ThePlanetsCarousel.vue';
import { DEFAULT_CURRENT_PAGE } from './constant';

const planetStore = usePlanetsStore();
const planetsPaginated = ref<Planet[]>([]);

const refreshPlanets = async (newValue: number) => {
  planetsPaginated.value = (await planetStore.getPlanetsWithPagination({ page: newValue })).results;
}

onMounted(async () => {
  planetsPaginated.value = (await planetStore.getPlanetsWithPagination({ page: DEFAULT_CURRENT_PAGE })).results;
})
</script>

<template>
  <section>
    <ThePlanetsFilter @filterPlanets="refreshPlanets(DEFAULT_CURRENT_PAGE)" />
    <ThePlanetsCarousel :carouselData="planetsPaginated" />
    <ThePlanetsPagination @pageChanged="refreshPlanets" />
  </section>
</template>
