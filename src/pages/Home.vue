<script setup lang="ts">
import Icon from '@/components/icon';


const items = []
</script>

<template>
  <div :class="$style.page">
    <div :class="$style.card">
      <div
        v-if="items.length"
        :class="$style.items"
      >
        <div :class="$style.item"></div>
      </div>
      <div
        v-else
        :class="$style.logoContainer"
      >
        <Icon
          name="big-logo"
          :class="$style.logo"
        />
      </div>
    </div>
    <div
      :class="$style.inputBlock"
    >
      <input
        :class="$style.input"
        placeholder="Опишите свою 3D-модель... (например, «Футуристический мотоцикл в стиле киберпанк с неоновыми огнями»)"
        type="text"
      />
      <button :class="$style.button">
        <Icon
          :class="$style.icon"
          name="logo"
        />
        Generate 3D
      </button>
    </div>
  </div>
</template>

<style module>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: var(--sidebar);
  padding: 20px;

  .card {
    border-radius: 12px;
    border: 1px solid var(--sidebar-border);
    background-image: linear-gradient(to right bottom in oklab, rgba(0, 212, 255, 0.05) 0%, rgba(138, 43, 226, 0.05) 100%);
    width: 100%;
    height: 100%;
    flex-grow: 2;
  }

  .inputBlock {
    display: flex;
    gap: 12px;
    align-items: end;

    border-radius: 12px;
    border: 1px solid var(--sidebar-border);
    background-image: var(--glass-bg);
    width: 100%;
    height: fit-content;
    padding: 20px;
    border: 1px solid var(--sidebar-border);

    .input {
      resize: vertical;
      padding: 12px 16px;
      border-radius: 8px;
      background-color: var(--input);
      border: 1px solid var(--sidebar-border);
      width: 100%;
      color: rgb(240, 240, 245);
      font-size: 24px;
    }
  }
}

.logoContainer {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
}

.logo {
  width: 60%;
  animation: pulse 3s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    scale: 1.0;
    translate: 0;
  }
  50% {
    scale: 1.1;
    translate: 0 -10px;
  }
  100% {
    scale: 1;
    translate: 0;
  }
}

.button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 12px;
  color: white;
  background-image: linear-gradient(135deg, rgb(0, 212, 255), rgb(168, 85, 247));
  font-size: 20px;
  cursor: pointer;
  transition: 0.1s;
  min-width: fit-content;

  &:hover {
    scale: 1.03;
  }

  &:active {
    scale: 0.98;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;
    outline-color: color-mix(in oklab, var(--ring) 50%, transparent);
    width: 40px;
    height: 40px;
    color: var(--foreground);
    border-radius: 10px;

    :deep(svg) {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
