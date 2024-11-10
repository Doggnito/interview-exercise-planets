<script setup lang="ts">
import { computed, type PropType } from 'vue';
import { colors } from 'quasar'
import { TERRAIN_COLOR_MAP } from './constant';
import { normalizeNumber } from '@/utils';

const props = defineProps({
  rotationPeriod: {
    type: String,
    required: true,
  },
  diameter: {
    type: String,
    required: true,
  },
  terrain: {
    type: Array as PropType<string[]>,
    required: true,
  }
})

const { getPaletteColor } = colors;
const rotationPeriodSeconds = computed(() => {
  const rotationPeriodNumber = Number(props.rotationPeriod);
  return (isNaN(rotationPeriodNumber) ? '20' : rotationPeriodNumber) + 's';
})

const planetColors = computed(() => 
  props.terrain
    .filter(terrain => terrain in TERRAIN_COLOR_MAP)
    .map(terrain => getPaletteColor(TERRAIN_COLOR_MAP[(terrain as keyof typeof TERRAIN_COLOR_MAP)]))
    .slice(0, 2)
)
  
const planetLinearGradient = computed(() => {
  switch (planetColors.value.length) {
    case 0:
      return `linear-gradient(90deg, ${getPaletteColor('grey-7')} 0%, ${getPaletteColor('grey-5')} 25%, #fff 50%, ${getPaletteColor('grey-5')}, ${getPaletteColor('grey-7')} 100%)`;;
    case 1:
      return `linear-gradient(90deg, ${planetColors.value[0]} 0%, #fff 50%, ${planetColors.value[0]} 100%)`;
    case 2:
      return `linear-gradient(90deg, ${planetColors.value[0]} 0%, ${planetColors.value[1]} 50%, ${planetColors.value[0]} 100%)`;
    case 3:
      return `linear-gradient(90deg, ${planetColors.value[0]} 0%, ${planetColors.value[1]} 25%, ${planetColors.value[2]} 50%, ${planetColors.value[1]} 75%, ${planetColors.value[0]} 100%)`;
    default:
      throw new Error('Invalid color number!');
  }
});

const MIN_DIAMETER = 140;
const MAX_DIAMETER = 280;
const getMarginTop = (size: number) => (MAX_DIAMETER - size) / 2 + 'px';

const planetStyle = computed(() => {
  const minMaxDiametersDiff = MAX_DIAMETER - MIN_DIAMETER;
  const meanDiameter = (MAX_DIAMETER + MIN_DIAMETER) / 2;

  let diameterNumber = Number(props.diameter);
  if (isNaN(diameterNumber)) return { size: meanDiameter + 'px', marginTop: getMarginTop(meanDiameter)};
  const MAX_DIAMETER_NORMALIZER = 15000;
  const MIN_DIAMETER_NORMALIZER = 5000;
  if (diameterNumber > MAX_DIAMETER_NORMALIZER) diameterNumber = MAX_DIAMETER_NORMALIZER;
  if (diameterNumber < MIN_DIAMETER_NORMALIZER) diameterNumber = MIN_DIAMETER_NORMALIZER;
  const size = MIN_DIAMETER + normalizeNumber(diameterNumber, MIN_DIAMETER_NORMALIZER, MAX_DIAMETER_NORMALIZER) * minMaxDiametersDiff;
  
  return {
    size: size + 'px',
    marginTop: getMarginTop(size),
  };
})
</script>

<template>
  <div class="planet" />
</template>

<style lang="scss" scoped>
.planet {
  width: v-bind('planetStyle.size');
  height: v-bind('planetStyle.size');
  display: inline-block;
  margin: v-bind('planetStyle.marginTop') 5px 5px;
  box-shadow: -20px -20px 50px 2px #000 inset, 0 0 10px 2px #222;
  border-radius: 50%;
  background: v-bind(planetLinearGradient);
  background-size: 200% 200%;
  animation: spin v-bind(rotationPeriodSeconds) linear infinite;
}

@keyframes spin {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 200%;
  }
}
</style>