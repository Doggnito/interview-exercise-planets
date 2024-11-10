<script lang="ts" setup>
import { usePlanetsStore } from '@/stores/planet';
import { DEFAULT_SORTING_ORDER } from '@/components/planets/constant';

const planetsStore = usePlanetsStore()

const resetFilters = () => {
  planetsStore.sortingOrder = DEFAULT_SORTING_ORDER;
  planetsStore.sortingKey = null;
  planetsStore.searchPlanetQuery = null;
}

</script>

<template>
  <q-btn round color="primary" icon="close" size="sm" @click="resetFilters" />
</template>