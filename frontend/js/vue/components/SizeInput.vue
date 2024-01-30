<template>
  <label>
    <p>{{ label }}</p>
    <input
      v-model="inputValue"
      type="number"
      @change="onChange"
    >
  </label>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  modelValue: {
    type: Number,
    required: true,
  },
  afterChange: {
    type: Function,
    default() {
      return () => {};
    },
  },
});

const emits = defineEmits(['update:modelValue']);

const validateValue = (value) => {
  if (value < props.min) {
    return props.min;
  }
  if (value > props.max) {
    return props.max;
  }
  return value;
};

const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', validateValue(value));
    props.afterChange();
  },
});

const onChange = (evt) => {
  evt.target.value = props.modelValue;
  props.afterChange();
};
</script>

<style lang="scss" scoped>

</style>
