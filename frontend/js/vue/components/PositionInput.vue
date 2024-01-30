<template>
  <label>
    <p>{{ label }}</p>
    <input
      :value="value"
      type="number"
      @input="onInput"
    >
  </label>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(['update']);

const onInput = (evt) => {
  evt.preventDefault();
  emits('update', Number(evt.target.value));
};
</script>

<style lang="scss" scoped>

</style>
