<template>
  <div class="page">
    <NavBar />
    <div class="content">
      <h1 class="page-title">♛ N 皇后回溯</h1>
      <p class="page-desc">在 N×N 棋盘上放置 N 个皇后，使其互不攻击（不同行、列、对角线）。观察回溯算法的试错与回退过程。</p>
      <NQueensVisualizer />
      <div class="notes">
        <h3>算法说明</h3>
        <p>回溯算法按行放置皇后：每行尝试每一列，检查是否与已放置的皇后冲突；若冲突则回退（移除上一行的皇后）尝试其他列，直到找到完整解。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import NQueensVisualizer from '@/components/NQueensVisualizer.vue'
</script>

<style scoped>
.page { min-height: 100%; }
.content { max-width: 1000px; margin: 0 auto; padding: 32px 24px; }
.page-title { font-size: 28px; font-weight: 700; margin-bottom: 8px; }
.page-desc { color: var(--text-muted); margin-bottom: 24px; }
.notes { background: var(--bg-card); border-radius: 12px; padding: 20px 24px; margin-top: 16px; }
.notes h3 { font-size: 16px; margin-bottom: 8px; color: var(--accent); }
.notes p { color: var(--text-muted); font-size: 13px; line-height: 1.7; }
</style>
