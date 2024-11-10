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

export type PlanetSelected = Pick<
  Planet,
  "population" | "rotation_period" | "climate" | "gravity" | "created"
> &
  Partial<Pick<Planet, "name" | "url">>;
