<template>
  <div class="page">
    <NavBar />
    <div class="content">
      <h1 class="page-title">🧱 迷宫生成</h1>
      <p class="page-desc">递归回溯（DFS）算法实时「挖」出一座迷宫，再点击「求解迷宫」用 BFS 找到从左上到右下的最短路径。</p>
      <MazeVisualizer />
      <div class="notes">
        <h3>算法说明</h3>
        <p><strong>生成</strong>：从起点出发，随机选择一个未访问的相邻格子打通墙壁，无法前进时回溯到上一个格子，直到所有格子都被访问。</p>
        <p><strong>求解</strong>：广度优先搜索（BFS）逐层扩展，保证找到最短路径。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import MazeVisualizer from '@/components/MazeVisualizer.vue'
</script>

<style scoped>
.page { min-height: 100%; }
.content { max-width: 1000px; margin: 0 auto; padding: 32px 24px; }
.page-title { font-size: 28px; font-weight: 700; margin-bottom: 8px; }
.page-desc { color: var(--text-muted); margin-bottom: 24px; }
.notes { background: var(--bg-card); border-radius: 12px; padding: 20px 24px; margin-top: 16px; }
.notes h3 { font-size: 16px; margin-bottom: 8px; color: var(--accent); }
.notes p { color: var(--text-muted); font-size: 13px; line-height: 1.7; margin-bottom: 8px; }
.notes strong { color: var(--text); }
</style>
