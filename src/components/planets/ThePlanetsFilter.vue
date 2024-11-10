<script lang="ts" setup>
import { usePlanetsStore } from '@/stores/planet';
import { computed, ref } from 'vue';
import TheSelect from '../shared/TheSelect.vue';

const emit = defineEmits<{
  (e: 'filterPlanets'): void;
}>();

const planetsStore = usePlanetsStore();
const filterValue = ref<string | null>(null);

const onInputValue = async (val: string) => {
  filterValue.value = val;
  planetsStore.searchPlanetQuery = val;
  await planetsStore.getAndSetPlanets();
  emit('filterPlanets');
}

const planetNames = computed(() =>
  planetsStore.planetData?.results.map((planet) => planet.name)
);
</script>

<template>
  <TheSelect
    :modelValue="filterValue"
    use-input
    hide-selected
    fill-input
    input-debounce="250"
    label="Search planets"
    :options="planetNames"
    @inputValue="onInputValue"
    style="width: 250px"
  >
    <template v-slot:noOption>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </TheSelect>
</template>