<script lang="ts" setup>
import { usePlanetsStore } from '@/stores/planet';
import TheSelect from '@/components/shared/TheSelect.vue';
import { SortingOrder } from '@/interfaces/planet';
import { DEFAULT_SORTING_ORDER } from '@/components/planets/constant';

const planetsStore = usePlanetsStore();
const sortingOptions = [
  DEFAULT_SORTING_ORDER,
  { value: SortingOrder.Ascending, label: "Ascending" },
];
</script>

<template>
  <TheSelect
    v-model="planetsStore.sortingOrder"
    label="Sorting order"
    :options="sortingOptions"
  />
</template>