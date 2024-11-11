import IconLink from "@/components/shared/IconLink.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

const meta: Meta<typeof IconLink> = {
  component: IconLink,
};

export default meta;
type Story = StoryObj<typeof IconLink>;

export const MaterialIcon: Story = {
  render: (args) => ({
    components: { IconLink },
    setup() {
      return { args };
    },
    template: '<IconLink v-bind="args" />',
  }),
  args: {
    href: "https://swapi.dev/api/planets/1/",
    name: "open_in_new",
  },
};

/**
 * # The CustomIcon component
 * Passing static name as `img:YOUR_ICON_PATH` will not render icon on production. <br />
 * To build icon properly on production use `new URL(YOUR_ICON_PATH, import.meta.url).href`
 */
export const CustomIcon: Story = {
  render: (args) => ({
    components: { IconLink },
    setup() {
      return { args };
    },
    template: '<IconLink v-bind="args" />',
  }),
  args: {
    href: "https://github.com/Doggnito/interview-exercise-planets",
    name: "img:/src/assets/github-mark-white.svg",
  },
};
