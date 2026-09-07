<template>
  <div class="page">
    <NavBar />
    <div class="content">
      <h1 class="page-title">#️⃣ 哈希表</h1>
      <p class="page-desc">用「除留余数法」计算哈希值，观察键如何映射到桶，以及冲突时如何用「链地址法」解决。</p>
      <HashTableVisualizer />
      <div class="notes">
        <h3>算法说明</h3>
        <p><strong>哈希函数</strong>：key % 桶数量，把键映射到对应桶；<strong>冲突解决</strong>：链地址法，多个键映射到同一桶时用链表串联。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import HashTableVisualizer from '@/components/HashTableVisualizer.vue'
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
