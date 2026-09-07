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
  </header>
</template>

<script setup>
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 24px;
  height: 60px;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  overflow-x: auto;
  white-space: nowrap;
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
</style>
