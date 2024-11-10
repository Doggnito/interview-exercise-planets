<script setup lang="ts">
import ThePlanetsFilter from '@/components/planets/ThePlanetsFilter.vue';
import ThePlanetsPagination from '@/components/planets/ThePlanetsPagination.vue';
import type { Planet } from '@/interfaces/planet';
import { usePlanetsStore } from '@/stores/planet';
import { computed, onMounted, ref } from 'vue';
import ThePlanetsCarousel from '@/components/planets/ThePlanetsCarousel.vue';
import { CAROUSEL_ITEMS_DEFAULT, CAROUSEL_ITEMS_FOR_LG, CAROUSEL_ITEMS_FOR_MD, DEFAULT_CURRENT_PAGE } from './constant';
import ThePlanetsList from './ThePlanetsList.vue';
import { useQuasar } from 'quasar';

const planetStore = usePlanetsStore();
const planetsPaginated = ref<Planet[]>([]);

const refreshPlanets = async (newValue: number) => {
  planetsPaginated.value = (await planetStore.getPlanetsWithPagination({ page: newValue })).results;
}

const { screen } = useQuasar();
const { md: isLowerThanMD, lg: isLowerThanLG, xl: isLowerThanXL } = screen.lt;
const showListWithoutCarousel = computed(() => {
  const isSmList = (isLowerThanMD && planetsPaginated.value.length === CAROUSEL_ITEMS_DEFAULT);
  const isMdList = (isLowerThanLG && planetsPaginated.value.length <= CAROUSEL_ITEMS_FOR_MD);
  const isLgList = (isLowerThanXL && planetsPaginated.value.length <= CAROUSEL_ITEMS_FOR_LG);
  const isXlList = !isLowerThanXL;
  return isSmList || isMdList || isLgList || isXlList;
})

onMounted(async () => {
  planetsPaginated.value = (await planetStore.getPlanetsWithPagination({ page: DEFAULT_CURRENT_PAGE })).results;
})
</script>

<template>
  <section class="column justify-center items-center">
    <ThePlanetsFilter @filterPlanets="refreshPlanets(DEFAULT_CURRENT_PAGE)" />
    <component
      :is="showListWithoutCarousel ? ThePlanetsList : ThePlanetsCarousel"
      :carouselData="planetsPaginated"
    />
    <ThePlanetsPagination class="q-mb-xl" @pageChanged="refreshPlanets" />
  </section>
  <Teleport to="body">
    <div class="shooting-stars">
      <div v-for="i in 10" :key="i" :class="['shooting-stars__star', `shooting-stars__star--${i}`]" />
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.shooting-stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  @media (max-width: $breakpoint-md-min) {
    display: none;
  }
}

.shooting-stars__star {
  position: absolute;
  z-index: -1;
  width: 4px;
  height: 4px;
  background: #fff;
  border-radius: 50%;
  opacity: 0;
  box-shadow: 0 0 0 4px rgba(255,255,255,0.1),0 0 0 8px rgba(255,255,255,0.1),0 0 20px rgba(255,255,255,0.1);
  animation: animate 3s linear infinite;

  &::before{
    content:'';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 300px;
    height: 1px;
    background: linear-gradient(90deg,#fff,transparent);
  }
}

@keyframes animate {
  0% {
    transform: rotate(315deg) translateX(0);
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100%{
    transform: rotate(315deg) translateX(-20vw);
    opacity: 0;
  }
}

$star-animation-delays: 0s, 0.2s, 0.4s, 0.6s, 0.8s, 1.2s, 1.6s, 2s, 0.75s, 2.75s;
$star-tops: 0, 0, 80px, 0, 0, 0, 300px, 0, 0, 0;
$star-rights: 0, 80px, 0, 180px, 400px, 600px, 0, 700px, 1000px, 450px;
$star-base-duration: 1;
$star-num-classes: length($star-animation-delays);

@for $i from 1 through $star-num-classes {
  .shooting-stars__star--#{$i} {
    $delay: nth($star-animation-delays, $i);
    $duration: $star-base-duration + 0.1s * $i;
    $width: $star-base-duration * $i * 30px + 50px;
    $top: nth($star-tops, $i);
    $right: nth($star-rights, $i);

    top: $top;
    right: $right;
    left: initial;
    animation-delay: $delay;
    animation-duration: $duration;
    
    &::before {
      width: $width;
    }
  }
}

// .shooting-star:nth-child(1){
//   top: 0;
//   right: 0;
//   left: initial;
//   animation-delay: 0s;
//   animation-duration: 1s;
  
//   &::before {
//     width: 100px;
//   }
// }
// .shooting-star:nth-child(2){
//   top: 0;
//   right: 80px;
//   left: initial;
//   animation-delay: 0.2s;
//   animation-duration: 3s;
  
//   &::before {
//     width: 100px;
//   }
// }
// .shooting-star:nth-child(3){
//   top: 80px;
//   right: 0px;
//   left: initial;
//   animation-delay: 0.4s;
//   animation-duration: 2s;
// }
// .shooting-star:nth-child(4){
//   top: 0;
//   right: 180px;
//   left: initial;
//   animation-delay: 0.6s;
//   animation-duration: 1.5s;
// }
// .shooting-star:nth-child(5){
//   top: 0;
//   right: 400px;
//   left: initial;
//   animation-delay: 0.8s;
//   animation-duration: 2.5s;
// }
// .shooting-star:nth-child(6){
//   top: 0;
//   right: 600px;
//   left: initial;
//   animation-delay: 1s;
//   animation-duration: 3s;
// }
// .shooting-star:nth-child(7){
//   top: 300px;
//   right: 0px;
//   left: initial;
//   animation-delay: 1.2s;
//   animation-duration: 1.75s;
// }
// .shooting-star:nth-child(8){
//   top: 0px;
//   right: 700px;
//   left: initial;
//   animation-delay: 1.4s;
//   animation-duration: 1.25s;
// }
// .shooting-star:nth-child(9){
//   top: 0px;
//   right: 1000px;
//   left: initial;
//   animation-delay: 0.75s;
//   animation-duration: 2.25s;
// }
// .shooting-star:nth-child(9){
//   top: 0px;
//   right: 450px;
//   left: initial;
//   animation-delay: 2.75s;
//   animation-duration: 2.75s;
// }
</style>