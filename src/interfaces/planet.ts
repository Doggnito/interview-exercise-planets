export interface PlanetData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
}

export interface GetPlanetsParams {
  search?: string;
  page?: number;
}

export interface Planet {
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

export type PlanetPropsForDescription = Pick<
  Planet,
  "population" | "rotation_period" | "climate" | "gravity" | "created"
> &
  Partial<Pick<Planet, "name" | "url">>;

export type PlanetSortOptionValue =
  | "population"
  | "rotation_period"
  | "surface_water"
  | "diameter";

export type PlanetSortOption = { value: PlanetSortOptionValue; label: string };

export enum SortingOrder {
  Ascending = "ascending",
  Descending = "descending",
}

export type SortingOrderOption = { value: SortingOrder; label: string };
