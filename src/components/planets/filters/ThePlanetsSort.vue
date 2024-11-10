<script lang="ts" setup>
import { usePlanetsStore } from '@/stores/planet';
import TheSelect from '@/components/shared/TheSelect.vue';

const planetsStore = usePlanetsStore();
const sortingOptions = [
  { value: "rotation_period", label: "Rotation period" },
  { value: "surface_water", label: "Surface Water" },
  { value: "population", label: "Population" },
  { value: "diameter", label: "Diameter" },
];
</script>

<template>
  <TheSelect
    v-model="planetsStore.sortingKey"
    label="Sort by"
    :options="sortingOptions"
  />
</template>