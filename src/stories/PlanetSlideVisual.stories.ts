import PlanetSlideVisual from "@/components/planets/planet/PlanetSlideVisual.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

const meta: Meta<typeof PlanetSlideVisual> = {
  component: PlanetSlideVisual,
};

export default meta;
type Story = StoryObj<typeof PlanetSlideVisual>;

export const StandardPlanet: Story = {
  render: (args) => ({
    components: { PlanetSlideVisual },
    setup() {
      return { args };
    },
    template: '<PlanetSlideVisual v-bind="args" />',
  }),
  args: {
    rotationPeriod: "20",
    diameter: "10000",
    terrain: [],
  },
};

export const LargePlanet: Story = {
  render: (args) => ({
    components: { PlanetSlideVisual },
    setup() {
      return { args };
    },
    template: '<PlanetSlideVisual v-bind="args" />',
  }),
  args: {
    rotationPeriod: "20",
    diameter: "15000",
    terrain: [],
  },
};

export const SmallPlanet: Story = {
  render: (args) => ({
    components: { PlanetSlideVisual },
    setup() {
      return { args };
    },
    template: '<PlanetSlideVisual v-bind="args" />',
  }),
  args: {
    rotationPeriod: "20",
    diameter: "5000",
    terrain: [],
  },
};

export const HighRotationPlanet: Story = {
  render: (args) => ({
    components: { PlanetSlideVisual },
    setup() {
      return { args };
    },
    template: '<PlanetSlideVisual v-bind="args" />',
  }),
  args: {
    rotationPeriod: "1",
    diameter: "10000",
    terrain: [],
  },
};

/**
 * # The terrains for planet
 * Terrains adds colors for planets, pass terrains in 0-3 range from
 * `C:\Users\domkapu\interview-exercise-planets\src\components\planets\planet\constant\index.ts`
 * to check the possible colors for terrains
 */
export const SingleTerrainPlanet: Story = {
  render: (args) => ({
    components: { PlanetSlideVisual },
    setup() {
      return { args };
    },
    template: '<PlanetSlideVisual v-bind="args" />',
  }),
  args: {
    rotationPeriod: "20",
    diameter: "10000",
    terrain: ["desert"],
  },
};

export const DoubleTerrainPlanet: Story = {
  render: (args) => ({
    components: { PlanetSlideVisual },
    setup() {
      return { args };
    },
    template: '<PlanetSlideVisual v-bind="args" />',
  }),
  args: {
    rotationPeriod: "20",
    diameter: "10000",
    terrain: ["desert", "grasslands"],
  },
};

export const TripleTerrainPlanet: Story = {
  render: (args) => ({
    components: { PlanetSlideVisual },
    setup() {
      return { args };
    },
    template: '<PlanetSlideVisual v-bind="args" />',
  }),
  args: {
    rotationPeriod: "20",
    diameter: "10000",
    terrain: ["desert", "grasslands", "mountains"],
  },
};
