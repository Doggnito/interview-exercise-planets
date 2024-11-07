<script lang="ts" setup>
import { usePlanetsStore } from '@/stores/planet';
import type { QSelect } from 'quasar';
import { onMounted, ref } from 'vue';

const planetsStore = usePlanetsStore();
const model = ref(null);
const filterPlanets = (val: string, update: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void) => {
  update(() => {
    planetsStore.searchPlanetQuery = val;
    planetsStore.getPlanets()
    return
  })
}

onMounted(async () => await planetsStore.getPlanets())
</script>

<template>
  <q-select
    filled
    v-model="model"
    use-input
    hide-selected
    fill-input
    input-debounce="200"
    label="Simple filter"
    :options="planetsStore.planetNames"
    @filter="filterPlanets"
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