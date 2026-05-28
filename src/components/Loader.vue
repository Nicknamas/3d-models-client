<script lang="ts" setup>
const animationDelayStep = 0.1
</script>

<template>
  <svg
    width="16"
    height="16"
    viewBox="-10 -10 20 20"
  >
    <circle
      id="circle"
      r="1"
      cx="0"
      cy="-8"
    />
    <circle
      id="circle"
      r="1"
      cx="0"
      cy="-8"
      :style="{ animationDelay: `${animationDelayStep * 1}s` }"
      transform="rotate(30)"
    />
    <circle
      id="circle"
      r="1"
      cx="0"
      cy="-8"
      :style="{ animationDelay: `${animationDelayStep * 2}s` }"
      transform="rotate(60)"
    />
    <circle
      id="circle"
      r="1"
      cx="0"
      cy="-8"
      :style="{ animationDelay: `${animationDelayStep * 3}s` }"
      transform="rotate(90)"
    />
    <circle
      id="circle"
      r="1"
      cx="0"
      cy="-8"
      :style="{ animationDelay: `${animationDelayStep * 4}s` }"
      transform="rotate(120)"
    />
    <circle
      id="circle"
      r="1"
      cx="0"
      cy="-8"
      :style="{ animationDelay: `${animationDelayStep * 5}s` }"
      transform="rotate(150)"
    />
    <circle
      id="circle"
      r="1"
      cx="0"
      cy="-8"
      :style="{ animationDelay: `${animationDelayStep * 6}s` }"
      transform="rotate(180)"
    />
    <circle
      id="circle"
      r="1"
      cx="0"
      cy="-8"
      :style="{ animationDelay: `${animationDelayStep * 7}s` }"
      transform="rotate(210)"
    />
    <circle
      id="circle"
      r="1"
      cx="0"
      cy="-8"
      :style="{ animationDelay: `${animationDelayStep * 8}s` }"
      transform="rotate(240)"
    />
    <circle
      id="circle"
      r="1"
      cx="0"
      cy="-8"
      :style="{ animationDelay: `${animationDelayStep * 9}s` }"
      transform="rotate(270)"
    />
    <circle
      id="circle"
      r="1"
      cx="0"
      cy="-8"
      :style="{ animationDelay: `${animationDelayStep * 10}s` }"
      transform="rotate(300)"
    />
    <circle
      id="circle"
      r="1"
      cx="0"
      cy="-8"
      :style="{ animationDelay: `${animationDelayStep * 11}s` }"
      transform="rotate(330)"
    />
  </svg>
</template>

<style lang="scss" scoped>
@keyframes fade {
  0% {
    opacity: 1;
    r: 1.3px;
  }

  100% {
    opacity: 0.1;
  }
}

#circle {
  fill: white;
  stroke-linecap: round;
  animation: fade calc(0.1s * 12) ease infinite;
}
</style>
