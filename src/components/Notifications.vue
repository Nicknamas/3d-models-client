<script lang="ts" setup>
import notifications from '../store/notification.ts'
</script>

<template>
  <TransitionGroup name="slide-fade">
    <p
      v-for="(notification, index) in notifications"
      :key="index"
      :style="{ top: `${20 + index * 50}px` }"
      class="notification text-medium"
      :class="{
        notification_success: notification.type === 'success',
        notification_error: notification.type === 'error',
      }"
    >
      {{ notification.message }}
    </p>
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-100px);
  opacity: 0;
}

.notification {
  position: absolute;
  top: 20px;
  left: calc(50% - 50px);
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: normal;
  z-index: 1000;

  &_success {
    background-color: var(--colors-green-200);
    color: var(--colors-green-500);
  }

  &_error {
    background-color: var(--colors-red-200);
    color: var(--colors-red-500);
  }
}
</style>
