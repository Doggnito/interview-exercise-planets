<script lang="ts" setup>
import { usePlanetsStore } from '@/stores/planet';
import type { QSelect } from 'quasar';
import { computed, onMounted, ref } from 'vue';

const emit = defineEmits<{
  (e: 'filterPlanets'): void;
}>();

const planetsStore = usePlanetsStore();
const model = ref<string | null>(null);

const onInputValue = async (val: string) => {
  model.value = val;
  planetsStore.searchPlanetQuery = val;
  await planetsStore.getAndSetPlanets();
  emit('filterPlanets');
}

const planetNames = computed(() =>
  planetsStore.planetData?.results.map((planet) => planet.name)
);

onMounted(async () => {
  await planetsStore.getAndSetPlanets();
})
</script>

<template>
  <q-select
    filled
    :modelValue="model"
    use-input
    hide-selected
    fill-input
    input-debounce="250"
    label="Simple filter"
    :options="planetNames"
    @input-value="onInputValue"
    style="width: 250px"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>