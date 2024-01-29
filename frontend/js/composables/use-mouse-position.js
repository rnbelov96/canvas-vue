import { onMounted, onUnmounted, ref } from 'vue';

export const useMousePosition = (element) => {
  const mx = ref(0);
  const my = ref(0);

  let elementPosition;
  let offsetX;
  let offsetY;

  function update(evt) {
    mx.value = parseInt(evt.clientX - offsetX, 10);
    my.value = parseInt(evt.clientY - offsetY, 10);
  }

  onMounted(() => {
    elementPosition = element.value.getBoundingClientRect();
    offsetX = elementPosition.left;
    offsetY = elementPosition.top;
    element.value.addEventListener('mousemove', update);
  });
  onUnmounted(() => element.value.removeEventListener('mousemove', update));

  return { mx, my };
};
