import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { usePlanetsStore } from "../planet";
import { SortingOrder } from "@/interfaces/planet";

vi.mock("axios");

describe("planet store", () => {
  describe("sortedPlanetsList", () => {
    beforeEach(() => {
      setActivePinia(createPinia());
    });

    it("should handle empty results", async () => {
      const planetStore = usePlanetsStore();
      planetStore.sortingKey = { value: "population", label: "population" };
      // full data is not important for testing sortedPlanetsList
      //@ts-expect-error next-line
      planetStore.planetData = {
        results: [],
      } as unknown;

      expect(planetStore.sortedPlanetsList).toEqual([]);
    });

    it("should handle one result", async () => {
      const planetStore = usePlanetsStore();
      planetStore.sortingKey = { value: "population", label: "population" };
      // full data is not important for testing sortedPlanetsList
      //@ts-expect-error next-line
      planetStore.planetData = {
        results: [
          {
            population: "1",
          },
        ],
      } as unknown;

      expect(planetStore.sortedPlanetsList).toEqual([
        {
          population: "1",
        },
      ]);
    });

    it("should handle zero in results", async () => {
      const planetStore = usePlanetsStore();
      planetStore.sortingKey = { value: "population", label: "population" };
      // full data is not important for testing sortedPlanetsList
      //@ts-expect-error next-line
      planetStore.planetData = {
        results: [
          {
            population: "0",
          },
          {
            population: "1",
          },
        ],
      } as unknown;

      expect(planetStore.sortedPlanetsList).toEqual([
        {
          population: "1",
        },
        {
          population: "0",
        },
      ]);
    });

    it("should leave unsorted array with sorting key as null", async () => {
      const planetStore = usePlanetsStore();
      // full data is not important for testing sortedPlanetsList
      //@ts-expect-error next-line
      planetStore.planetData = {
        results: [
          {
            population: "2",
          },
          {
            population: "1",
          },
          {
            population: "4",
          },
          {
            population: "3",
          },
        ],
      } as unknown;

      expect(planetStore.sortedPlanetsList).toEqual([
        {
          population: "2",
        },
        {
          population: "1",
        },
        {
          population: "4",
        },
        {
          population: "3",
        },
      ]);
    });

    it("should handle sorted array", async () => {
      const planetStore = usePlanetsStore();
      planetStore.sortingKey = { value: "population", label: "population" };
      // full data is not important for testing sortedPlanetsList
      //@ts-expect-error next-line
      planetStore.planetData = {
        results: [
          {
            population: "4",
          },
          {
            population: "3",
          },
          {
            population: "2",
          },
          {
            population: "1",
          },
        ],
      } as unknown;

      expect(planetStore.sortedPlanetsList).toEqual([
        {
          population: "4",
        },
        {
          population: "3",
        },
        {
          population: "2",
        },
        {
          population: "1",
        },
      ]);
    });

    it("should handle reversed array", async () => {
      const planetStore = usePlanetsStore();
      planetStore.sortingKey = { value: "population", label: "population" };
      // full data is not important for testing sortedPlanetsList
      //@ts-expect-error next-line
      planetStore.planetData = {
        results: [
          {
            population: "1",
          },
          {
            population: "2",
          },
          {
            population: "3",
          },
          {
            population: "4",
          },
        ],
      } as unknown;

      expect(planetStore.sortedPlanetsList).toEqual([
        {
          population: "4",
        },
        {
          population: "3",
        },
        {
          population: "2",
        },
        {
          population: "1",
        },
      ]);
    });

    it("should handle mixed array", async () => {
      const planetStore = usePlanetsStore();
      planetStore.sortingKey = { value: "population", label: "population" };
      // full data is not important for testing sortedPlanetsList
      //@ts-expect-error next-line
      planetStore.planetData = {
        results: [
          {
            population: "5",
          },
          {
            population: "6",
          },
          {
            population: "3",
          },
          {
            population: "1",
          },
          {
            population: "7",
          },
          {
            population: "4",
          },
          {
            population: "2",
          },
        ],
      } as unknown;

      expect(planetStore.sortedPlanetsList).toEqual([
        {
          population: "7",
        },
        {
          population: "6",
        },
        {
          population: "5",
        },
        {
          population: "4",
        },
        {
          population: "3",
        },
        {
          population: "2",
        },
        {
          population: "1",
        },
      ]);
    });

    it("should handle different sorting key", async () => {
      const planetStore = usePlanetsStore();
      planetStore.sortingKey = { value: "diameter", label: "diameter" };
      // full data is not important for testing sortedPlanetsList
      //@ts-expect-error next-line
      planetStore.planetData = {
        results: [
          {
            diameter: "3",
          },
          {
            diameter: "1",
          },
          {
            diameter: "4",
          },
          {
            diameter: "2",
          },
        ],
      } as unknown;

      expect(planetStore.sortedPlanetsList).toEqual([
        {
          diameter: "4",
        },
        {
          diameter: "3",
        },
        {
          diameter: "2",
        },
        {
          diameter: "1",
        },
      ]);
    });

    it("should handle ascending sorting order", async () => {
      const planetStore = usePlanetsStore();
      planetStore.sortingKey = { value: "population", label: "population" };
      planetStore.sortingOrder = {
        value: SortingOrder.Ascending,
        label: "ascending",
      };
      // full data is not important for testing sortedPlanetsList
      //@ts-expect-error next-line
      planetStore.planetData = {
        results: [
          {
            population: "3",
          },
          {
            population: "1",
          },
          {
            population: "4",
          },
          {
            population: "2",
          },
        ],
      } as unknown;

      expect(planetStore.sortedPlanetsList).toEqual([
        {
          population: "1",
        },
        {
          population: "2",
        },
        {
          population: "3",
        },
        {
          population: "4",
        },
      ]);
    });

    it("should leave NaN values on the end", async () => {
      const planetStore = usePlanetsStore();
      planetStore.sortingKey = { value: "population", label: "population" };
      // full data is not important for testing sortedPlanetsList
      //@ts-expect-error next-line
      planetStore.planetData = {
        results: [
          {
            population: "3",
          },
          {
            population: "NaN",
          },
          {
            population: "NaN",
          },
          {
            population: "1",
          },
          {
            population: "4",
          },
          {
            population: "NaN",
          },
          {
            population: "2",
          },
        ],
      } as unknown;

      expect(planetStore.sortedPlanetsList).toEqual([
        {
          population: "4",
        },
        {
          population: "3",
        },
        {
          population: "2",
        },
        {
          population: "1",
        },
        {
          population: "NaN",
        },
        {
          population: "NaN",
        },
        {
          population: "NaN",
        },
      ]);
    });
  });
});
