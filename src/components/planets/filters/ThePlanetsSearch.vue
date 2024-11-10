<script lang="ts" setup>
import { usePlanetsStore } from '@/stores/planet';
import { computed } from 'vue';
import TheSelect from '@/components/shared/TheSelect.vue';

const emit = defineEmits<{
  (e: 'filterPlanets'): void;
}>();

const planetsStore = usePlanetsStore();

const onInputValue = async (val: string) => {
  planetsStore.searchPlanetQuery = val;
  await planetsStore.getPlanets();
  emit('filterPlanets');
}

const planetNames = computed(() =>
  planetsStore.planetData?.results.map((planet) => planet.name)
);
</script>

<template>
  <TheSelect
    :modelValue="planetsStore.searchPlanetQuery"
    use-input
    hide-selected
    fill-input
    input-debounce="250"
    label="Search planets"
    :options="planetNames"
    @inputValue="onInputValue"
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