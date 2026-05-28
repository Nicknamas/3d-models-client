<script lang="ts" setup>
import Icon from '@/components/icon'

interface Props {
  routeName: string
  routeDomain: string
  iconName: string
  label: string
  isExpand: boolean
}

defineProps<Props>()
</script>

<template>
  <RouterLink
    :to="{ name: routeName }"
    class="navigation-link text-semi-light"
    :class="{
      'navigation-link_active': $route.fullPath.slice(0, 15).includes(routeDomain),
    }"
  >
    <Icon :name="iconName" />
    <div v-if="isExpand" class="navigation-link__label nowrap text-bold">
      {{ label }}
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.navigation-link {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 400;
  padding-block: 12px;
  border-radius: 12px;
  transition: 0.2s;
  color: var(--sidebar-foreground);

  &:hover:not(.navigation-link_active) {
    background-color: var(--sidebar-accent);
  }

  &_active {
    background-color: var(--sidebar-primary);
    color: var(--sidebar-primary-foreground)
  }
}
</style>
