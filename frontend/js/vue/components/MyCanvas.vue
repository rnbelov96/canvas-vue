<template>
  <canvas
    ref="canvas"
    class="canvas"
    :width="width"
    :height="height"
    @mousedown="mousedownHandler"
    @mouseup="mouseupHandler"
    @mousemove="mousemoveHandler"
  />
  <div>
    <size-input
      v-model="circleData.r"
      label="Радиус круга"
      :min="minCircleRadius"
      :max="maxCircleRadius"
    />
    <size-input
      v-model="rectData.side"
      label="Сторона квадрата"
      :min="0"
      :max="maxRectSide"
      :after-change="centerRect"
    />
    <position-input
      label="X квадрата"
      :value="rectData.x"
      @update="updateRectPosition('x', $event)"
    />
    <position-input
      label="Y квадрата"
      :value="rectData.y"
      @update="updateRectPosition('y', $event)"
    />
  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';
import { useMousePosition } from '../../composables/use-mouse-position';
import SizeInput from './SizeInput.vue';
import PositionInput from './PositionInput.vue';

const props = defineProps({
  width: {
    type: Number,
    default: 500,
  },
  height: {
    type: Number,
    default: 500,
  },
  rectSide: {
    type: Number,
    default: 100,
  },
  circleRadius: {
    type: Number,
    default: 200,
  },
});

const canvas = ref(null);
const context = ref(null);
const isDragOk = ref(false);

const rectData = reactive({
  x: props.width / 2 - props.rectSide / 2,
  y: props.height / 2 - props.rectSide / 2,
  side: props.rectSide,
});
const circleData = reactive({
  x: props.width / 2,
  y: props.height / 2,
  r: props.circleRadius,
});

const { mx, my } = useMousePosition(canvas);

let startDraggingPositionX = '';
let startDraggingPositionY = '';

const clear = () => {
  context.value.clearRect(0, 0, 500, 500);
};
const draw = () => {
  clear();
  context.value.fillRect(rectData.x, rectData.y, rectData.side, rectData.side);
  context.value.beginPath();
  context.value.arc(circleData.x, circleData.y, circleData.r, 0, 2 * Math.PI);
  context.value.stroke();
};
const isRectInsideCircle = (newXPosition, newYPosition) => {
  const points = [
    {
      x: newXPosition,
      y: newYPosition,
    },
    {
      x: newXPosition + rectData.side,
      y: newYPosition,
    },
    {
      x: newXPosition,
      y: newYPosition + rectData.side,
    },
    {
      x: newXPosition + rectData.side,
      y: newYPosition + rectData.side,
    },
  ];

  return points.every(point => {
    if (!((point.x - circleData.x) ** 2 + (point.y - circleData.y) ** 2 < circleData.r ** 2)) {
      return false;
    }

    return true;
  });
};
const centerRect = () => {
  rectData.x = props.width / 2 - rectData.side / 2;
  rectData.y = props.height / 2 - rectData.side / 2;
};

const minCircleRadius = computed(() => Math.floor(Math.sqrt(((rectData.side ** 2) * 2)) / 2));
const maxCircleRadius = computed(() => Math.ceil(props.width / 2));
const maxRectSide = computed(() => Math.floor(Math.sqrt((circleData.r * 2) ** 2 / 2)));

const updateRectPosition = (axis, value) => {
  switch (axis) {
    case 'x':
      if (isRectInsideCircle(value, rectData.y)) {
        rectData.x = value;
      }
      break;
    case 'y':
      if (isRectInsideCircle(rectData.x, value)) {
        rectData.y = value;
      }
      break;
    default:
      break;
  }
};

const isDraggingAllow = () => {
  return mx.value > rectData.x && mx.value < rectData.x + rectData.side && my.value > rectData.y && my.value < rectData.y + rectData.side;
};

const mousedownHandler = (evt) => {
  evt.preventDefault();
  evt.stopPropagation();

  if (isDraggingAllow()) {
    isDragOk.value = true;
  }

  startDraggingPositionX = mx.value;
  startDraggingPositionY = my.value;
};
const mouseupHandler = () => {
  isDragOk.value = false;
};
const mousemoveHandler = (evt) => {
  if (!isDragOk.value) {
    return;
  }

  evt.preventDefault();
  evt.stopPropagation();

  const dx = mx.value - startDraggingPositionX;
  const dy = my.value - startDraggingPositionY;

  const newXPosition = rectData.x + dx;
  const newYPosition = rectData.y + dy;

  if (!isRectInsideCircle(newXPosition, newYPosition)) {
    return;
  }

  rectData.x = newXPosition;
  rectData.y = newYPosition;

  startDraggingPositionX = mx.value;
  startDraggingPositionY = my.value;
};

onMounted(() => {
  context.value = canvas.value.getContext('2d');
  draw();
});

watch(
  rectData,
  () => {
    draw();
  },
);

watch(
  circleData,
  () => {
    draw();
  },
);
</script>

<style scoped>
.canvas {
  border: 1px solid black
}
</style>
