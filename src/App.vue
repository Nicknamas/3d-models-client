<script setup lang="ts">

</script>

<template>
  <RouterView />
</template>

<style>
@import '@/styles/variables.css';

html, body, #app {
  height: 100%
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
  appearance: none;
  outline: none;
  border: none;
}

a {
  text-decoration: none;
}

::-webkit-scrollbar {
  background-color: linear-gradient(to right bottom in oklab, rgba(0, 212, 255, 0.05) 0%, rgba(138, 43, 226, 0.05) 100%);;
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: var(--muted-foreground);
  border-radius: 4px;
}
</style>
