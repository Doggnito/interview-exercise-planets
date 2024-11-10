<script setup lang="ts">
import ThePlanetsPagination from '@/components/planets/ThePlanetsPagination.vue';
import { usePlanetsStore } from '@/stores/planet';
import { computed, onMounted } from 'vue';
import ThePlanetsCarousel from '@/components/planets/ThePlanetsCarousel.vue';
import { CAROUSEL_ITEMS_DEFAULT, CAROUSEL_ITEMS_FOR_LG, CAROUSEL_ITEMS_FOR_MD } from '@/components/planets/constant';
import ThePlanetsList from '@/components/planets/ThePlanetsList.vue';
import { useQuasar } from 'quasar';
import ThePlanetsFilters from '@/components/planets/filters/ThePlanetsFilters.vue';

const planetStore = usePlanetsStore();

const refreshPlanets = async (newValue: number) => {
  await planetStore.getPlanets({ page: newValue });
}

const { screen } = useQuasar();
const { md: isLowerThanMD, lg: isLowerThanLG, xl: isLowerThanXL } = screen.lt;
const showListWithoutCarousel = computed(() => {
  const isSmList = (isLowerThanMD && planetStore.sortedPlanetsList.length === CAROUSEL_ITEMS_DEFAULT);
  const isMdList = (isLowerThanLG && planetStore.sortedPlanetsList.length <= CAROUSEL_ITEMS_FOR_MD);
  const isLgList = (isLowerThanXL && planetStore.sortedPlanetsList.length <= CAROUSEL_ITEMS_FOR_LG);
  const isXlList = !isLowerThanXL;
  return isSmList || isMdList || isLgList || isXlList;
})

onMounted(async () => {
  await planetStore.getPlanets();
})
</script>

<template>
  <section class="column justify-center items-center">
    <ThePlanetsFilters @refreshPlanets="refreshPlanets" />
    <component
      :is="showListWithoutCarousel ? ThePlanetsList : ThePlanetsCarousel"
      :planetsList="planetStore.sortedPlanetsList"
    />
    <ThePlanetsPagination v-if="planetStore.sortedPlanetsList.length" class="q-mb-xl" @pageChanged="refreshPlanets" />
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
  z-index: -1;
  width: 100%;
  height: 100%;
  overflow: hidden;

  @media (max-width: $breakpoint-md-min) {
    display: none;
  }
}

.shooting-stars__star {
  position: absolute;
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

</style>