import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { api } from "@/axios";

interface PlanetData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
}

interface Planet {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: unknown[];
  films: unknown[];
  url: string;
  created: string;
  edited: string;
}

export const usePlanetsStore = defineStore("planets", () => {
  const planetData = ref<PlanetData | null>(null);
  const planets = computed(() => planetData.value?.results);
  const searchPlanetQuery = ref<string | null>(null);
  const planetNames = computed(() =>
    planetData.value?.results.map((planet) => planet.name)
  );

  async function getPlanets() {
    let query = "planets";
    if (searchPlanetQuery.value) {
      query += `?search=${searchPlanetQuery.value}`;
    }
    planetData.value = (await api.get(query)).data;
  }

  return {
    planets,
    planetNames,
    searchPlanetQuery,
    getPlanets,
  };
});
