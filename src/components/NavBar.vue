<template>
  <header class="navbar">
    <router-link to="/" class="logo">🧮 Algo<span>Visualizer</span></router-link>
    <nav>
      <router-link to="/sorting" class="nav-link" active-class="active-link">排序</router-link>
      <router-link to="/pathfinding" class="nav-link" active-class="active-link">寻路</router-link>
      <router-link to="/nqueens" class="nav-link" active-class="active-link">N皇后</router-link>
      <router-link to="/maze" class="nav-link" active-class="active-link">迷宫</router-link>
      <router-link to="/binarytree" class="nav-link" active-class="active-link">二叉树</router-link>
      <router-link to="/linkedlist" class="nav-link" active-class="active-link">链表</router-link>
      <router-link to="/hashtable" class="nav-link" active-class="active-link">哈希表</router-link>
    </nav>

    <div class="theme-switcher" ref="switcherRef">
      <button class="theme-btn" title="切换主题" @click="open = !open">
        <span class="swatch" :style="{ background: currentTheme.swatch }"></span>
        <span class="theme-name">{{ currentTheme.name }}</span>
      </button>
      <transition name="fade">
        <div v-if="open" class="theme-menu">
          <div
            v-for="t in themes"
            :key="t.key"
            class="theme-option"
            :class="{ active: t.key === currentKey }"
            @click="selectTheme(t.key)"
          >
            <span class="swatch" :style="{ background: t.swatch }"></span>
            <span>{{ t.name }}</span>
            <span v-if="t.key === currentKey" class="check">✓</span>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { themes, applyTheme, loadTheme, saveTheme } from '@/themes'

const switcherRef = ref(null)
const open = ref(false)
const currentKey = ref(loadTheme())

const currentTheme = computed(() => themes.find((t) => t.key === currentKey.value) || themes[0])

function selectTheme(key) {
  currentKey.value = key
  applyTheme(key)
  saveTheme(key)
  open.value = false
}

function onDocClick(e) {
  if (switcherRef.value && !switcherRef.value.contains(e.target)) {
    open.value = false
  }
}

onMounted(() => window.addEventListener('click', onDocClick))
onUnmounted(() => window.removeEventListener('click', onDocClick))
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 24px;
  height: 60px;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}
.logo {
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
  flex-shrink: 0;
}
.logo span {
  color: var(--accent);
}
nav {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
}
.nav-link {
  color: var(--text-muted);
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  transition: color 0.2s, background 0.2s;
  flex-shrink: 0;
}
.nav-link:hover {
  color: var(--text);
  background: var(--bg-hover);
}
.active-link {
  color: #fff;
  background: var(--primary);
}

/* 主题切换器 */
.theme-switcher {
  position: relative;
  flex-shrink: 0;
}
.theme-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-card);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 13px;
  cursor: pointer;
  transition: border-color 0.2s;
}
.theme-btn:hover {
  border-color: var(--primary);
}
.swatch {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid rgba(128, 128, 128, 0.4);
  flex-shrink: 0;
}
.theme-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 6px;
  min-width: 130px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}
.theme-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  color: var(--text);
  font-size: 13px;
}
.theme-option:hover {
  background: var(--bg-hover);
}
.theme-option.active {
  color: var(--accent);
}
.check {
  margin-left: auto;
  color: var(--accent);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
