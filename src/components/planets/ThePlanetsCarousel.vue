<script setup lang="ts">
import type { Planet } from '@/interfaces/planet';
import type { PropType } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import PlanetSlide from '@/components/planet/PlanetSlide.vue';
import { useQuasar } from 'quasar';
import 'vue3-carousel/dist/carousel.css';

defineProps({
  carouselData: {
    type: Array as PropType<Planet[]>,
    required: true,
  }
})

const $q = useQuasar();
const { md, lg, xl } = $q.screen.sizes;
const carouselConfig = {
  itemsToShow: 1,
  snapAlign: 'center',
  breakpointMode: 'carousel',
  breakpoints: {
    [md]: {
      itemsToShow: 3,
      snapAlign: 'start',
    },
    [lg]: {
      itemsToShow: 5,
      snapAlign: 'start',
    },
    [xl]: {
      itemsToShow: 5,
      snapAlign: 'start',
    },
  },
}

</script>

<template>
  <Carousel v-bind="carouselConfig">
    <template #slides>
      <Slide v-for="(planet, planetIndex) in carouselData" :key="planetIndex">
        <PlanetSlide :planet="planet" />
      </Slide>
    </template>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>
