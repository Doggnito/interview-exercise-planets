<script setup lang="ts">
import type { Planet } from '@/interfaces/planet';
import type { PropType } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import PlanetSlide from '@/components/planet/PlanetSlide.vue';
import { useQuasar } from 'quasar';
import 'vue3-carousel/dist/carousel.css';
import { CAROUSEL_ITEMS_DEFAULT, CAROUSEL_ITEMS_FOR_LG, CAROUSEL_ITEMS_FOR_MD } from '@/components/planets/constant';

defineProps({
  planetsList: {
    type: Array as PropType<Planet[]>,
    required: true,
  }
})

const { screen } = useQuasar();
const { md, lg } = screen.sizes;

const carouselConfig = {
  itemsToShow: CAROUSEL_ITEMS_DEFAULT,
  snapAlign: 'center',
  breakpointMode: 'carousel',
  breakpoints: {
    [md]: {
      itemsToShow: CAROUSEL_ITEMS_FOR_MD,
    },
    [lg]: {
      itemsToShow: CAROUSEL_ITEMS_FOR_LG,
    },
  },
}

</script>
 
<template>
  <div class="carousel-wrapper">
    <Carousel v-bind="carouselConfig" wrapAround snapAlign="start">
      <template #slides>
        <Slide v-for="(planet, planetIndex) in planetsList" :key="planetIndex">
          <PlanetSlide :planet="planet" />
        </Slide>
      </template>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<style lang="scss" scoped>
.carousel-wrapper {
  margin-bottom: 20px;
  width: 100%;
}

:deep(.carousel__slide) {
  align-items: start;
  margin-bottom: 50px;
  min-height: 600px;
}

:deep(.carousel__icon) {
  fill: $grey-1;
}
</style>