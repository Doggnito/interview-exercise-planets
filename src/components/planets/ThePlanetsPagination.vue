<script lang="ts" setup>
import { usePlanetsStore } from '@/stores/planet';
import { computed, ref, watch } from 'vue';
import { DEFAULT_CURRENT_PAGE } from '@/components/planets/constant';

const emit = defineEmits<{
  /** Fired when pagination page change */
  (e: 'pageChanged', value: number): void,
}>();

const PLANETS_PER_PAGE = 10;
const currentPage = ref(DEFAULT_CURRENT_PAGE);
const planetStore = usePlanetsStore();

const planetsPages = computed(() => {
  return Math.ceil((planetStore.planetData?.count ?? 0) / PLANETS_PER_PAGE);
});

const onChangePage = (newPage: number) => {
  currentPage.value = newPage;
  emit('pageChanged', newPage);
}

watch(planetsPages, () => {
  currentPage.value = DEFAULT_CURRENT_PAGE;
})
</script>

<template>
  <q-pagination
    :model-value="currentPage"
    :max="planetsPages"
    direction-links
    flat
    color="grey"
    active-color="primary"
    @update:model-value="onChangePage"
  />
</template>