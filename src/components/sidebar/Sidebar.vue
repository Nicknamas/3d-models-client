<script lang="ts" setup>
import Icon from '@/components/icon'
import NavigationLink from './ui/NavigationLink.vue'
import { useExpandSidebar } from './model/useExpandSidebar'
import { links } from '@/components/sidebar/model/constants'

interface Emit {
  updateSidebarStatus: [boolean]
}

const emit = defineEmits<Emit>()

const isExpandSidebar = defineModel<boolean>({ default: false })
const { toggleExpand } = useExpandSidebar(isExpandSidebar, emit)
</script>

<template>
  <aside
    :class="$style.sidebar"
    :data-expand="isExpandSidebar"
  >
    <div :class="$style.row">
      <Icon
        v-if="isExpandSidebar"
        size="40"
        name="logo"
        :class="$style.logo"
      />
      <Icon
        :class="$style.expander"
        name="expander"
        @click="toggleExpand"
      />
    </div>
    <nav
      :class="$style.navigation"
    >
      <NavigationLink
        v-for="(link, index) of links"
        :key="index"
        :class="$style.link"
        :route-name="link.routeTo"
        :route-domain="link.routeDomain"
        :icon-name="link.iconName"
        :label="link.label"
        :is-expand="isExpandSidebar"
      />
    </nav>
    <RouterLink
      :to="{ name: 'Home' }"
      :class="$style.profile"
    >
      <Icon
        :class="$style.avatar"
        name="avatar"
        size="24"
      />
    </RouterLink>
  </aside>
</template>

<style module>
.sidebar {
  --sidebar-gap: 24px;
  --sidebar-padding: 0;
  --sidebar-background: var(--sidebar);

  --avatar-size: 32px;

  --profile-padding: 12px 8px;
  --profile-border-radius: 16px;
  --profile-background: var(--colors-grey-200);
  --profile-gap: 8px;
  --profile-text-sm: 12px;
  --profile-text-sm-height: calc(var(--profile-text-md) + 6px);
  --profile-text-md: 16px;
  --profile-text-md-height: calc(var(--profile-text-md) + 6px);
  --profile-subtitle-color: var(--colors-grey-900);
  --profile-circle-color: var(--colors-grey-400);
  --profile-circle-size: 4px;

  display: flex;
  flex-direction: column;
  gap: var(--sidebar-gap);
  overflow: hidden;
  position: relative;
  padding: var(--sidebar-padding);
  height: 100%;
  width: 100%;
  flex-shrink: 0;
  max-width: var(--sidebar--width-hide);
  transition: var(--sidebar--transition);
  border-right: var(--sidebar-border);
  background-color: var(--sidebar-background);

  &[data-expand="true"] {
    max-width: var(--sidebar--width-expand);
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border: 1px solid var(--sidebar-border);

    .expander {
      cursor: pointer;
    }
  }

  .profile {
    display: flex;
    gap: var(--profile-gap);
    border: 1px solid var(--sidebar-border);
    padding: 16px;

    .description {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .avatar {
      width: var(--avatar-size);
      height: var(--avatar-size);
      border-radius: 50%;
    }

    .text[data-size="md"] {
      font-size: var(--profile-text-md);
      line-height: var(--profile-text-md-height);
    }

    .text[data-size="sm"] {
      font-size: var(--profile-text-sm);
      line-height: var(--profile-text-sm-height);
      color: var(--profile-subtitle-color);
    }

    .circle + .text {
      display: block;
    }

    .circle {
      display: none;
      width: var(--profile-circle-size);
      height: var(--profile-circle-size);
      border-radius: 50%;
      background-color: var(--profile-circle-color);
    }
  }
}

.navigation {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
  padding: 16px;

  .link {
    gap: 8px;
    width: 100%;
    padding-inline: 8px;
  }
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;
  outline-color: color-mix(in oklab, var(--ring) 50%, transparent);
  width: 40px;
  height: 40px;
  color: var(--foreground);
  background-image: linear-gradient(to right bottom in oklab, rgb(0, 212, 255) 0%, rgb(168, 85, 247) 100%);
  border-radius: 10px;

  :deep(svg) {
    width: 24px;
    height: 24px;
  }
}
</style>
