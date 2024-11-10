import { computed, ref } from "vue";
import { defineStore } from "pinia";
import {
  SortingOrder,
  type GetPlanetsParams,
  type PlanetData,
  type PlanetSortOption,
  type SortingOrderOption,
} from "@/interfaces/planet";
import { useApiStore } from "./api";
import { DEFAULT_CURRENT_PAGE } from "@/components/planets/constant";

export const usePlanetsStore = defineStore("planets", () => {
  const apiStore = useApiStore();
  const planetData = ref<PlanetData>({
    results: [],
    next: null,
    previous: null,
    count: 0,
  });
  const searchPlanetQuery = ref<string | null>(null);
  const sortingKey = ref<PlanetSortOption | null>(null);
  const sortingOrder = ref<SortingOrderOption | null>(null);

  const sortedPlanetsList = computed(() => {
    const sortKey = sortingKey.value?.value;
    if (!sortKey) return planetData.value.results;

    return planetData.value.results.sort((a, b) => {
      const sortingOrderModifier =
        sortingOrder.value?.value === SortingOrder.Ascending ? 1 : -1;
      const aValueNumeric = Number(a[sortKey]);
      const bValueNumeric = Number(b[sortKey]);

      if (isNaN(aValueNumeric)) return 1;
      if (isNaN(bValueNumeric)) return -1;
      return (aValueNumeric - bValueNumeric) * sortingOrderModifier;
    });
  });

  async function getPlanets(
    data: {
      page: number;
    } = {
      page: DEFAULT_CURRENT_PAGE,
    }
  ) {
    const { page } = data;
    const params: GetPlanetsParams = {};
    if (searchPlanetQuery.value) {
      params.search = searchPlanetQuery.value;
    }
    if (page) {
      params.page = page;
    }
    const planets = await apiStore.getWithCancel<PlanetData>("planets", {
      params,
    });

    if (!planets) return;
    planetData.value = planets;
  }

  return {
    searchPlanetQuery,
    planetData,
    sortingKey,
    sortedPlanetsList,
    sortingOrder,
    getPlanets,
  };
});
