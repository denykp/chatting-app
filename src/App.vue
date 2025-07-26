<script setup lang="ts">
import { RouterView } from 'vue-router'
import ChatList from './components/ChatList.vue'
</script>

<template>
  <header class="h-dvh overflow-y-auto overflow-x-hidden border-r border-neutral-600">
    <ChatList />
  </header>

  <RouterView class="col-span-3" />
</template>

<style scoped></style>
