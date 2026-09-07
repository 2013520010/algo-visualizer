<template>
  <div class="page">
    <NavBar />
    <div class="content">
      <h1 class="page-title">🗺️ 寻路算法可视化</h1>
      <p class="page-desc">选择算法、在网格上画墙，观看算法如何探索并找到从起点到终点的最短路径。</p>
      <PathfindingVisualizer />
      <div class="algorithm-notes">
        <h3>算法说明</h3>
        <ul>
          <li><strong>BFS（广度优先）</strong>：逐层扩展，保证找到最短路径（边权相等时）。</li>
          <li><strong>DFS（深度优先）</strong>：一条路走到黑，再回溯，不一定是最短路径。</li>
          <li><strong>Dijkstra</strong>：带权图的最短路径算法，用优先队列贪心扩展。</li>
          <li><strong>A* 寻路</strong>：在 Dijkstra 基础上加入启发式函数，更高效地导向终点。</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import PathfindingVisualizer from '@/components/PathfindingVisualizer.vue'
</script>

<style scoped>
.page {
  min-height: 100%;
}
.content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px;
}
.page-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}
.page-desc {
  color: var(--text-muted);
  margin-bottom: 24px;
}
.algorithm-notes {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 20px 24px;
  margin-top: 16px;
}
.algorithm-notes h3 {
  font-size: 16px;
  margin-bottom: 12px;
  color: var(--accent);
}
.algorithm-notes ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 8px;
}
.algorithm-notes li {
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.6;
}
.algorithm-notes strong {
  color: var(--text);
}
</style>
