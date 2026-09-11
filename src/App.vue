<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { loadTheme, applyTheme } from './themes'

onMounted(() => {
  applyTheme(loadTheme())
})
</script>
