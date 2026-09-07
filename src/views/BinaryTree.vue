<template>
  <div class="page">
    <NavBar />
    <div class="content">
      <h1 class="page-title">🌳 二叉树遍历</h1>
      <p class="page-desc">随机生成一棵二叉搜索树（BST），观察前序、中序、后序、层序四种遍历方式的访问顺序。</p>
      <BinaryTreeVisualizer />
      <div class="notes">
        <h3>算法说明</h3>
        <p><strong>前序</strong>：根 → 左 → 右；<strong>中序</strong>：左 → 根 → 右（BST 中序即有序序列）；<strong>后序</strong>：左 → 右 → 根；<strong>层序</strong>：逐层从左到右。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import BinaryTreeVisualizer from '@/components/BinaryTreeVisualizer.vue'
</script>

<style scoped>
.page { min-height: 100%; }
.content { max-width: 1000px; margin: 0 auto; padding: 32px 24px; }
.page-title { font-size: 28px; font-weight: 700; margin-bottom: 8px; }
.page-desc { color: var(--text-muted); margin-bottom: 24px; }
.notes { background: var(--bg-card); border-radius: 12px; padding: 20px 24px; margin-top: 16px; }
.notes h3 { font-size: 16px; margin-bottom: 8px; color: var(--accent); }
.notes p { color: var(--text-muted); font-size: 13px; line-height: 1.7; }
.notes strong { color: var(--text); }
</style>
