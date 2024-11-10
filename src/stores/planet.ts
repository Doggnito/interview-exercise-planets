import { ref } from "vue";
import { defineStore } from "pinia";
import type { GetPlanetsParams, PlanetData } from "@/interfaces/planet";
import { useApiStore } from "./api";

export const usePlanetsStore = defineStore("planets", () => {
  const apiStore = useApiStore();
  const planetData = ref<PlanetData>({
    results: [],
    next: null,
    previous: null,
    count: 0,
  });
  const searchPlanetQuery = ref<string | null>(null);

  async function getPlanets(data: { page?: number | undefined }) {
    const { page } = data;
    const params: GetPlanetsParams = {};
    if (searchPlanetQuery.value) {
      params.search = searchPlanetQuery.value;
    }
    if (page) {
      params.page = page;
    }
    const response = await apiStore.getWithCancel("planets", {
      params,
    });

    return await response?.data;
  }
  async function getAndSetPlanets() {
    const planets = await getPlanets({});
    planetData.value = planets;
  }
  async function getPlanetsWithPagination(data: {
    page: number;
  }): Promise<PlanetData> {
    const { page } = data;
    const planets: PlanetData | undefined = await getPlanets({ page });
    if (!planets) return planetData.value;
    planetData.value = planets;
    return planets;
  }

  return {
    searchPlanetQuery,
    planetData,
    getPlanets,
    getAndSetPlanets,
    getPlanetsWithPagination,
  };
});
