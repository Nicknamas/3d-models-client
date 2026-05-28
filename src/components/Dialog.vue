<script lang="ts" setup>
interface Props {
  width?: string
  headless?: boolean
}

interface Emits {
  close: []
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const isShow = defineModel<boolean>({ required: true })

function close() {
  isShow.value = false
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="slide-fade">
      <div
        v-if="isShow"
        id="dialog"
        class="dialog-backdrop"
      >
        <div
          v-if="!headless"
          class="dialog dialog_padding"
          v-bind="$attrs"
          :style="{ 'max-width': width ? `${width}px` : '50vw' }"
        >
          <div class="dialog__actions">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              @click="close"
            >
              <path
                d="M21.6561 20.399L17.2563
              15.9992L21.6561 11.5995C21.8228
              11.4328 21.9164 11.2067 21.9164
              10.9709C21.9164 10.7352 21.8228
              10.5091 21.6561 10.3424C21.4894 10.1757 21.2633
              10.082 21.0276 10.082C20.7918 10.082 20.5657
              10.1757 20.399 10.3424L15.9992 14.7422L11.5995
              10.3424C11.4328 10.1757 11.2067 10.082 10.9709
              10.082C10.7352 10.082 10.5091 10.1757 10.3424
              10.3424C10.1757 10.5091 10.082 10.7352 10.082
              10.9709C10.082 11.2067 10.1757 11.4328 10.3424
              11.5995L14.7422 15.9992L10.3424 20.399C10.1757
              20.5657 10.082 20.7918 10.082 21.0276C10.082
              21.2633 10.1757 21.4894 10.3424 21.6561C10.5091
              21.8228 10.7352 21.9164 10.9709 21.9164C11.2067
              21.9164 11.4328 21.8228 11.5995 21.6561L15.9992
              17.2563L20.399 21.6561C20.5657 21.8228 20.7918
              21.9164 21.0276 21.9164C21.2633 21.9164 21.4894
              21.8228 21.6561 21.6561C21.8228 21.4894 21.9164
              21.2633 21.9164 21.0276C21.9164 20.7918 21.8228
              20.5657 21.6561 20.399Z"
                fill="#8A96A6"
              />
            </svg>
          </div>
          <slot name="header" />
          <div class="dialog__content">
            <slot name="content" />
          </div>
          <div
            v-if="$slots.buttons"
            class="dialog__buttons"
          >
            <slot name="buttons" />
          </div>
        </div>
        <div
          v-else
          class="dialog"
          :style="{ 'max-width': width ? `${width}px` : '50vw' }"
          v-bind="$attrs"
        >
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.dialog {
  position: relative;
  margin-top: 100px;
  margin-inline: auto;
  transition: 0.3s;
  background-color: var(--sidebar);
  border-radius: 20px;

  &_padding {
    padding: 20px;
  }

  &-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    z-index: 500;
    padding-inline: 16px;
    padding-bottom: 20px;
    background-color: #00000080;
    overflow: auto;
  }

  &__actions {
    position: absolute;
    right: 16px;
    top: 16px;

    > * {
      cursor: pointer;
    }
  }

  &__buttons {
    display: flex;
    justify-content: center;
    gap: 16px;
  }
}
</style>
