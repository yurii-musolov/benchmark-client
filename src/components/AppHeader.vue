<script setup>
defineProps({
  title: String,
})
</script>

<template>
  <header class="app-header">
    <h1>{{ title }}</h1>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  border-bottom: solid 1px #888;
  padding: 0 48px;
}
</style>
