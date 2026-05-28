<script setup lang="ts">
import DownloadFile from '@/components/DownloadFile.vue';
import Icon from '@/components/icon';
import Toggle from '@/components/Toggle.vue';
import { useAxios } from '@/utils/useAxios';
import { computed, onBeforeMount, ref, useTemplateRef, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import Loader from '@/components/Loader.vue';
import useMessage from '@/utils/useMessage.ts';
import { decodeJWT } from '@/utils/jwt';

const axios = useAxios()
const route = useRoute()
const router = useRouter()
const isAsideVisible = ref(false)

const cardRef = useTemplateRef<HTMLDivElement>('card')

const messages = ref([])
const sessions = ref([])

const userInput = ref<string>()
const isLoading = ref<boolean>(false)

const intlFormatter = new Intl.DateTimeFormat('ru-RU', {
  dateStyle: 'short',
  timeStyle: 'short',
})

const sessionIdFromRoute = computed(() => route.params.sessionId)

async function deleteSession(sessionId): Promise<void> {
  await axios.delete('/sessions/' + sessionId)
  await updateItems()
  await updateSessions()

  if (sessionId == sessionIdFromRoute.value) {
    router.push({ name: 'Home' })
  }

  useMessage({
    type: 'success',
    message: 'Сессия удалена',
    duration: 3000,
  })
}

async function createSession(): Promise<void> {
  router.push({ name: 'Home' })
  messages.value = []

  useMessage({
    type: 'success',
    message: 'Сессия создана',
    duration: 3000,
  })
}

async function postMessage(): Promise<void> {
  isLoading.value = true
  if (!sessionIdFromRoute.value) {
    const response = await axios.post('/sessions')
    const sessionId = response.data.id
    await router.push({ name: 'HomeWithSession', params: { sessionId } })
    await updateSessions()
  }


  const scrollHeight = cardRef.value?.scrollHeight
  cardRef.value?.scroll({ behavior: 'smooth', top: scrollHeight })

  const request = userInput.value

  messages.value.push({
    id: 0,
    request,
    script: '',
    description: '',
    isShow: false,
    created_at: new Date(),
  })

  userInput.value = ''

  try {
    await axios.post('/messages', {
      session_id: sessionIdFromRoute.value,
      request
    })

    useMessage({
      type: 'success',
      message: 'Запрос обработался',
      duration: 3000,
    })

    const scrollHeight = cardRef.value?.scrollHeight
    cardRef.value?.scroll({ behavior: 'smooth', top: scrollHeight })

    messages.value.pop()

    await updateItems()
  } catch (e) {
    useMessage({
      type: 'error',
      message: 'Возникла ошибка',
      duration: 3000,
    })

    messages.value.pop()
  } finally {
    isLoading.value = false
  }
}

async function updateItems() {
  if (sessionIdFromRoute.value) {
    const params = new URLSearchParams({ session_id: sessionIdFromRoute.value as string })
    const response = await axios.get('/messages?' + params)
    response.data.map((item) => {
      return {
        ...item,
        isShow: false,
      }
    })
    messages.value = response.data
  }
}

async function updateSessions() {
  const response = await axios.get('/sessions')
  sessions.value = response.data
}

watch(sessionIdFromRoute, () => {
  messages.value = []
  updateItems()
  updateSessions()
}, { immediate: true })

</script>

<template>
  <div :class="$style.page">
    <div :class="$style.block">
      <div
        ref="card"
        :class="$style.card"
      >
        <div
          :class="$style.items"
        >
          <div
            v-for="item of messages"
            :key="item.id"
            :class="$style.item"
          >
            <div :class="$style.userMessage">
              <div :class="$style.circle"></div>
              <p :class="$style.text">
                {{ item.request }}
              </p>
              <p :class="$style.datetime">{{ intlFormatter.format(new Date(item.created_at)) }}</p>
            </div>
            <div
              v-if="item.description"
              :class="$style.aiMessage"
            >
              <div :class="$style.row">
                <p :class="$style.text">
                  скрипт / описание
                </p>
                <Toggle
                  :class="$style.toggle"
                  :is-toggled="item.isShow"
                  @click="item.isShow = !item.isShow"
                />
                <DownloadFile :model-object="item.object" />
              </div>
              <MdPreview
                v-if="item.isShow"
                :model-value="item.description"
                :class="$style.editor"
                theme="dark"
                :code-foldable="false"
              />
              <MdPreview
                :class="$style.editor"
                v-else
                :model-value="item.script"
                theme="light"
                :code-foldable="false"
              />
              <p :class="$style.datetime">{{ intlFormatter.format(new Date(item.created_at)) }}</p>
            </div>
          </div>
        </div>
        <div
          :class="
            [$style.logoContainer, messages.length ? $style.opacity : undefined]
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
        <div :class="$style.header">
          <input
            v-model="userInput"
            :class="[$style.input, isLoading ? $style.loading : undefined]"
            :disabled="isLoading"
            placeholder="Опишите свою 3D-модель... (например, «Футуристический мотоцикл в стиле киберпанк с неоновыми огнями»)"
            type="text"
            @keydown.enter="postMessage"
          />
          <button
            :class="$style.button"
            :disabled="isLoading"
            @click="postMessage"
          >
            <Icon
              v-if="!isLoading"
              :class="$style.icon"
              name="logo"
            />
            <Loader
              v-else
              loading
            />
          </button>
        </div>
        <div :class="$style.footer">
          <button
            :class="$style.icon"
            @click="isAsideVisible = !isAsideVisible"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square size-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </button>
          <button
            :class="$style.icon"
            @click="createSession"
          >
            +
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="isAsideVisible"
      :class="$style.aside"
    >
      <div :class="$style.sessions">
        <a
          v-for="session of sessions"
          :key="session.id"
          :class="[$style.session, session.id == sessionIdFromRoute ? $style.active : undefined]"
          @click="$router.push({ name: 'HomeWithSession', params: { sessionId: session.id } })"
        >
          <button
            :class="$style.icon"
            @click.stop="deleteSession(session.id)"
          >
            x
          </button>
          <p>
              {{ session.title }}
          </p>
          <p :class="$style.datetime">{{ intlFormatter.format(new Date(session.created_at)) }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<style module>
.page {
  display: flex;
  gap: 20px;
  background-color: var(--sidebar);
  padding: 20px;
  height: 100%;

  .aside {
    position: relative;
    height: 100%;
    min-width: 300px;
    background-image: linear-gradient(to right bottom in oklab, rgba(0, 212, 255, 0.05) 0%, rgba(138, 43, 226, 0.05) 100%);
    border: 1px solid var(--sidebar-border);
    border-radius: 8px;

    .sessions {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 4px;
      overflow-y: auto;
      height: 100%;
      padding: 12px;

      .session {
        position: relative;
        color: white;
        padding: 16px 20px;
        transition: 0.2s;
        border-radius: 12px;
        cursor: pointer;

        &.active {
          cursor: default;
          background-color: var(--neon-purple);

          .icon {
            border-color: white;
            color: white;
          }
        }

        &:hover {
          background-color: var(--neon-purple);

          .icon {
            border-color: white;
            color: white;
          }
        }

        .icon {
          position: absolute;
          top: calc(50% - 12px);
          right: 8px;
          background-color: transparent;
          cursor: pointer;
          transition: 0.1s;
          display: grid;
          place-items: center;
          border: 2px solid red;
          border-radius: 50%;
          color: red;
          width: 24px;
          height: 24px;
          font-size: 14px;
          font-weight: bold;

          &:hover {
            scale: 1.06;
          }

          &:active {
            scale: 0.95;
          }

          path {
            stroke: red;
          }
        }
      }
    }
  }

  .block {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .card {
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
        font-size: 16px;

        .userMessage, .aiMessage {
          padding: 12px 16px;
          border-radius: 12px;
          background-color: var(--muted);
          width: fit-content;
          white-space: break-spaces;
          word-wrap: break-word;
        }

        .userMessage {
          text-align: right;
          margin-left: auto;
        }

        .aiMessage {
          position: relative;
          max-width: 70%;
          padding-top: 60px;

          .row {
            display: flex;
            align-items: center;
            gap: 8px;
            position: absolute;
            top: 10px;
            right: 10px;
          }

          .toggle {
            cursor: pointer;
          }
        }
      }
    }
  }

  .inputBlock {
    position: relative;
    align-items: end;
    display: flex;
    flex-direction: column;
    gap: 16px;

    border-radius: 12px;
    border: 1px solid var(--sidebar-border);
    background-image: var(--glass-bg);
    width: 100%;
    height: fit-content;
    padding: 20px;
    border: 1px solid var(--sidebar-border);

    .header {
      display: flex;
      width: 100%;
      gap: 12px;
    }

    .footer {
      display: flex;
      gap: 12px;
      justify-content: start;
      width: 100%;

      .icon {
        background-color: transparent;
        cursor: pointer;
        transition: 0.1s;
        display: grid;
        place-items: center;
        border: 2px solid white;
        padding: 8px;
        border-radius: 50%;
        color: white;
        width: 48px;
        height: 48px;
        font-size: 24px;

        &:hover {
          scale: 1.06;
        }

        &:active {
          scale: 0.95;
        }

        path {
          stroke: white;
        }
      }
    }

    .input {
      resize: vertical;
      padding: 12px 16px;
      border-radius: 8px;
      background-color: var(--input);
      border: 1px solid var(--sidebar-border);
      width: 100%;
      color: rgb(240, 240, 245);
      font-size: 24px;

      &[disabled] {
        cursor: progress;
      }
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
  justify-content: center;
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

  &[disabled] {
    cursor: progress;
    width: 60px;
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

.datetime {
  font-size: 12px;
  color: var(--muted-foreground);
}
</style>

<style>
.md-editor-preview .md-editor-code {
  margin: 0 !important;
}

.md-editor-previewOnly {
  background-color: transparent;
  height: fit-content;
}
</style>
