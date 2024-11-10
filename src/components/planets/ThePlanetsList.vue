<script setup lang="ts">
import type { Planet } from '@/interfaces/planet';
import type { PropType } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import PlanetSlide from '@/components/planet/PlanetSlide.vue';
import { useQuasar } from 'quasar';
import 'vue3-carousel/dist/carousel.css';
import { CAROUSEL_ITEMS_DEFAULT, CAROUSEL_ITEMS_FOR_LG, CAROUSEL_ITEMS_FOR_MD } from './constant';

defineProps({
  carouselData: {
    type: Array as PropType<Planet[]>,
    required: true,
  }
})

</script>
 
<template>
  <ul class="list">
    <li v-for="(planet, planetIndex) in carouselData" :key="planetIndex" class="list__item">
      <PlanetSlide :planet="planet"/>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 40px;
  margin-bottom: 20px;

  &__item {
    min-height: 600px;
    width: 320px;
  }
}
</style>