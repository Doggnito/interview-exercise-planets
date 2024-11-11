import PlanetSlideContent from "../PlanetSlideContent.vue";
import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

// for TS, not tested
const defaultParameters = {
  rotation_period: "",
  gravity: "",
  population: "",
  climate: "",
  created: "",
  name: "",
  url: "",
};

describe("PlanetSlideContent.vue test", () => {
  it("renders data in proper format", () => {
    const wrapper = shallowMount(PlanetSlideContent, {
      props: {
        planet: {
          ...defaultParameters,
          rotation_period: "23",
          gravity: "1 standard",
          population: "1000",
          climate: "standard",
          created: "2014-12-09T13:50:49.641000Z",
          name: "PlanetName",
        },
      },
    });

    expect(wrapper.find('[data-testid="rotationPeriodValue"]').text()).toMatch(
      "23"
    );
    expect(wrapper.find('[data-testid="gravityValue"]').text()).toMatch(
      "1 standard"
    );
    expect(wrapper.find('[data-testid="climateValue"]').text()).toMatch(
      "standard"
    );
    expect(wrapper.find('[data-testid="populationValue"]').text()).toMatch(
      "1 000"
    );
    expect(wrapper.find('[data-testid="createdValue"]').text()).toMatch(
      "9.12.2014, 14:50:49"
    );
    expect(wrapper.find('[data-testid="planetName"]').text()).toMatch(
      "PlanetName"
    );
  });

  it("renders inproper data properly", () => {
    const wrapper = shallowMount(PlanetSlideContent, {
      props: {
        planet: {
          ...defaultParameters,
          rotation_period: "unknown",
          gravity: " 1 standard  ",
          population: "unknown",
          climate: "standard, other standard ",
          created: "unknown",
          name: "unknown",
        },
      },
    });

    expect(wrapper.find('[data-testid="rotationPeriodValue"]').text()).toMatch(
      "unknown"
    );
    expect(wrapper.find('[data-testid="gravityValue"]').text()).toMatch(
      "1 standard"
    );
    expect(wrapper.find('[data-testid="climateValue"]').text()).toMatch(
      "standard, other standard"
    );
    expect(wrapper.find('[data-testid="populationValue"]').text()).toMatch(
      "unknown"
    );
    expect(wrapper.find('[data-testid="createdValue"]').text()).toMatch("-");
    expect(wrapper.find('[data-testid="planetName"]').text()).toMatch(
      "unknown"
    );
  });
});
