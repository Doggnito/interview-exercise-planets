<script lang="ts" setup>
import { useSlots } from 'vue';

const emit = defineEmits<{
  /** Fired when value of input has changed */
  (e: 'inputValue', value: string): void
}>();

const model = defineModel();
const slots = useSlots();
</script>

<template>
  <q-select
    v-model="model"
    labelColor="white"
    bg-color="grey-8"
    dark
    outlined
    rounded
    dense
    :popupContentClass="$style['select-popup']"
    :class="$style.select"
    @inputValue="value => emit('inputValue', value)"
  >
    <template  v-if="slots.noOption" v-slot:no-option>
      <slot name="noOption" />
    </template>
  </q-select>
</template>

<style lang="scss" module>
div.select-popup {
  border-radius: 28px;
 
  & :global(.q-item) {
    min-height: 40px;
  }
}

.select {
  width: 240px;

  @media (max-width: $breakpoint-sm-min) {
    width: 150px;
  }
}
</style>