<template>
  <header class="navbar">
    <router-link to="/" class="logo">🧮 Algo<span>Visualizer</span></router-link>
    <nav>
      <router-link to="/" exact-active-class="active-link" class="nav-link">首页</router-link>
      <router-link to="/sorting" active-class="active-link" class="nav-link">排序算法</router-link>
      <router-link to="/pathfinding" active-class="active-link" class="nav-link">寻路算法</router-link>
    </nav>
    <a href="https://github.com" target="_blank" class="gh-link">GitHub ↗</a>
  </header>
</template>

<script setup>
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 60px;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(8px);
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
}
.logo span {
  color: var(--accent);
}
nav {
  display: flex;
  gap: 8px;
}
.nav-link {
  color: var(--text-muted);
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 15px;
  transition: color 0.2s, background 0.2s;
}
.nav-link:hover {
  color: var(--text);
  background: var(--bg-hover);
}
.active-link {
  color: #fff;
  background: var(--primary);
}
.gh-link {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 14px;
}
.gh-link:hover {
  color: var(--text);
}
</style>
