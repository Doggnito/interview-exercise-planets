import type { Preview } from "@storybook/vue3";
import { setup } from "@storybook/vue3";
import { createPinia } from "pinia";
import router from "../src/router";
import { Quasar } from "quasar";

import "../src/scss/index.scss";
import "quasar/dist/quasar.css";
import "@quasar/extras/material-icons/material-icons.css";

setup((app) => {
  app.use(createPinia());
  app.use(router);
  app.use(Quasar, {});
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
