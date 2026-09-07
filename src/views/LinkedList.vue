<template>
  <div class="page">
    <NavBar />
    <div class="content">
      <h1 class="page-title">🔗 链表操作</h1>
      <p class="page-desc">观察单链表的头插、尾插、删除、以及经典的反转操作（prev/curr/next 三指针）。</p>
      <LinkedListVisualizer />
      <div class="notes">
        <h3>算法说明</h3>
        <p><strong>反转链表</strong>：用 prev、curr、next 三个指针，逐个将 curr 的指针指向前驱 prev，直到遍历完整个链表。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import LinkedListVisualizer from '@/components/LinkedListVisualizer.vue'
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
