<script setup lang="ts">
import Icon from '@/components/icon';
import { useAxios } from '@/utils/useAxios';
import { computed, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'

const axios = useAxios()
const route = useRoute()
const router = useRouter()

const items = ref([])

const userInput = ref<string>()

const sessionIdFromRoute = computed(() => route.params.sessionId)

async function postMessage(): Promise<void> {
  if (!sessionIdFromRoute.value) {
    const response = await axios.post('/sessions')
    const sessionId = response.data.id
    await router.push({ name: 'HomeWithSession', params: { sessionId } })
  }

  await axios.post('/messages', {
    session_id: sessionIdFromRoute.value,
    description: userInput.value
  })

  userInput.value = ''

  await updateItems()
}

async function updateItems() {
  if (sessionIdFromRoute.value) {
    const response = await axios.get('/messages')
    items.value = response.data
  }
}

watch(sessionIdFromRoute, updateItems, { immediate: true })
</script>

<template>
  <div :class="$style.page">
    <div :class="$style.card">
      <div
        :class="$style.items"
      >
        <div
          v-for="item of items"
          :key="item.id"
          :class="$style.item"
        >
          <div :class="$style.userMessage">
            <div :class="$style.circle"></div>
            <p :class="$style.text">
              {{ item.description }}
            </p>
          </div>
          <div :class="$style.aiMessage">
            <div :class="$style.circle"></div>
            <a :class="$style.text">
              some-file.txt
            </a>
          </div>
        </div>
      </div>
      <div
        :class="
          [$style.logoContainer, items.length ? $style.opacity : undefined]
        "
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
        v-model="userInput"
        :class="$style.input"
        placeholder="Опишите свою 3D-модель... (например, «Футуристический мотоцикл в стиле киберпанк с неоновыми огнями»)"
        type="text"
      />
      <button
        :class="$style.button"
        @click="postMessage"
      >
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
  height: 100%;

  .card {
    position: relative;
    border-radius: 12px;
    border: 1px solid var(--sidebar-border);
    background-image: linear-gradient(to right bottom in oklab, rgba(0, 212, 255, 0.05) 0%, rgba(138, 43, 226, 0.05) 100%);
    width: 100%;
    height: 100%;
    flex-grow: 2;
    padding: 20px;
    overflow-y: auto;

    .items {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: end;
      gap: 12px;

      .item {
        display: flex;
        flex-direction: column;
        gap: 8px;
        color: var(--colors-white);
        font-size: 24px;

        .userMessage, .aiMessage {
          padding: 12px 16px;
          border-radius: 12px;
          background-color: var(--muted);
          width: fit-content;
        }

        .userMessage {
          text-align: right;
          margin-left: auto;
        }

        .aiMessage {
        }
      }
    }
  }

  .inputBlock {
    position: relative;
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
  position: absolute;
  z-index: 0;
  inset: 0;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  transition: 0.2s;
}

.logo {
  width: 60%;
  animation: pulse 3s infinite ease-in-out;
}

.opacity {
  position: sticky;
  opacity: 40%;
  bottom: 50%;
  height: 0;

  .logo {
    width: 40%;
    min-height: 100%;
    animation: pulse-mini 3s infinite ease-in-out;
  }
}

@keyframes pulse-mini {
  0% {
    scale: 1.0;
    translate: 0;
  }
  50% {
    scale: 1.04;
    translate: 0 -5px;
  }
  100% {
    scale: 1;
    translate: 0;
  }
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
