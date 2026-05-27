<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/sidebar'

const isExpandSidebar = ref(false)
</script>

<template>
  <div class="root">
    <Sidebar @update-sidebar-status="isExpandSidebar = $event" />
    <div class="root__wrapper" :class="{ root__wrapper_expand: !isExpandSidebar }">
      <RouterView id="root-content" v-slot="{ Component }" class="root__content">
        <KeepAlive :max="10">
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-slide-enter-active,
.header-slide-leave-active {
  transition: all 0.15s ease-out;
}

.header-slide-enter-from {
  opacity: 0;
  transform: translateY(-50%);
}

.header-slide-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}

.header-slide-enter-to,
.header-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.root {
  display: flex;
  height: 100%;

  &__wrapper,
  &__content {
    height: 100%;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: var(--colors-white);
    width: calc(100% - var(sidebar--width-expand));
    transition: var(--sidebar--transition);

    &_expand {
      width: calc(100% - var(--sidebar--width-hide));
    }
  }

  &__content {
    transition: 0.3s;
    overflow-y: auto;
    flex-grow: 1;
    width: 100%;
  }
}
</style>
