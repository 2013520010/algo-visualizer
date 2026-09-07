<template>
  <div class="page">
    <NavBar />
    <div class="content">
      <h1 class="page-title">📊 排序算法可视化</h1>
      <p class="page-desc">柱状图的高度代表数值大小，观察不同排序算法如何将乱序数组排成有序。</p>
      <SortingVisualizer />
      <div class="algorithm-notes">
        <h3>算法说明</h3>
        <ul>
          <li><strong>冒泡排序</strong>：相邻元素两两比较，每次把最大的「冒泡」到最后。</li>
          <li><strong>选择排序</strong>：每轮选出未排序部分的最小值，放到已排序末尾。</li>
          <li><strong>插入排序</strong>：将元素逐个插入到已排序序列的正确位置。</li>
          <li><strong>快速排序</strong>：选基准值，将小于/大于基准的元素分到两侧，递归处理。</li>
          <li><strong>归并排序</strong>：分治思想，先递归拆分，再合并有序子序列。</li>
          <li><strong>堆排序</strong>：构建大顶堆，反复取堆顶（最大值）放到末尾。</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import SortingVisualizer from '@/components/SortingVisualizer.vue'
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
