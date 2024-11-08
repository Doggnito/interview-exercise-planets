import { ref } from "vue";
import { defineStore } from "pinia";
import { api } from "@/axios";
import type { GetPlanetsParams, PlanetData } from "@/interfaces/planet";

export const usePlanetsStore = defineStore("planets", () => {
  const planetData = ref<PlanetData | null>(null);
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
    const response = await api.get("planets", {
      params,
    });

    return await response.data;
  }
  async function getAndSetPlanets() {
    const planets = await getPlanets({});
    planetData.value = planets;
  }
  async function getPlanetsWithPagination(data: {
    page: number;
  }): Promise<PlanetData> {
    const { page } = data;
    return await getPlanets({ page });
  }

  return {
    searchPlanetQuery,
    planetData,
    getPlanets,
    getAndSetPlanets,
    getPlanetsWithPagination,
  };
});
