<script lang="ts" setup>
interface Props {
  isToggled?: boolean
}

defineProps<Props>()
</script>

<template>
  <div :class="$style.wrapper">
    <div
      :class="[$style.track, isToggled && $style.trackActive]"
    >
      <div :class="[$style.thumb, isToggled && $style.thumbActive]"></div>
    </div>
  </div>
</template>


<style module>
.wrapper {
  display: inline-block;
  user-select: none;
}

.track {
  width: 50px;
  height: 28px;
  background-color: #e5e7eb;
  border-radius: 9999px;
  padding: 2px;
  transition: background-color 0.2s ease;
  position: relative;
  box-sizing: border-box;
}

.trackActive {
  background-color: #10b981;
}

.thumb {
  width: 24px;
  height: 24px;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  left: 2px;
  top: 2px;
}

.thumbActive {
  transform: translateX(22px);
}
</style>
