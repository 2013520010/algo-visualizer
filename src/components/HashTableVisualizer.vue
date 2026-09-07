<template>
  <div class="hashtable-visualizer">
    <div class="controls">
      <button class="btn primary" @click="insertRandom">插入随机键</button>
      <button class="btn" @click="insertSpecific">插入指定键</button>
      <button class="btn" @click="reset">清空</button>
      <div class="control-group">
        <label>桶数量</label>
        <select v-model="size" @change="reset">
          <option :value="5">5</option>
          <option :value="8">8</option>
          <option :value="10">10</option>
        </select>
      </div>
    </div>

    <div class="table">
      <div v-for="(bucket, i) in buckets" :key="i" class="bucket" :class="{ highlight: highlightIndex === i }">
        <div class="bucket-index">{{ i }}</div>
        <div class="chain">
          <div v-for="(key, j) in bucket" :key="j" class="entry">{{ key }}</div>
          <div v-if="bucket.length === 0" class="empty-slot">—</div>
        </div>
      </div>
    </div>

    <div class="legend">
      <span><i class="dot normal"></i>桶</span>
      <span><i class="dot highlight"></i>当前插入</span>
      <span><i class="dot collision"></i>发生冲突</span>
      <span class="stats">{{ status }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { hash, createBuckets } from '@/algorithms/hashtable'

const size = ref(8)
const buckets = ref(createBuckets(8))
const highlightIndex = ref(-1)
const collision = ref(false)
const status = ref('')

let lastInsertedKey = null

function reset() {
  buckets.value = createBuckets(size.value)
  highlightIndex.value = -1
  collision.value = false
  status.value = ''
  lastInsertedKey = null
}

function doInsert(key) {
  const index = hash(key, size.value)
  const chain = buckets.value[index]
  const isCollision = chain.length > 0
  highlightIndex.value = index
  collision.value = isCollision
  chain.push(key)
  lastInsertedKey = key
  status.value = `hash(${key}) = ${key} % ${size.value} = ${index}${isCollision ? '，发生冲突（链地址法）' : ''}`
}

function insertRandom() {
  doInsert(Math.floor(Math.random() * 90) + 10)
}

function insertSpecific() {
  const key = window.prompt('请输入要插入的整数（10-99）：', '42')
  if (key === null) return
  const k = parseInt(key, 10)
  if (isNaN(k)) return
  doInsert(k)
}
</script>

<style scoped>
.hashtable-visualizer {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  background: var(--bg-card);
  padding: 16px 20px;
  border-radius: 12px;
}
.control-group {
  display: flex;
  align-items: center;
  gap: 8px;
}
.control-group label {
  color: var(--text-muted);
  font-size: 14px;
}
.control-group select {
  background: var(--bg);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 6px 10px;
  outline: none;
}
.btn {
  background: var(--bg-hover);
  color: var(--text);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
}
.btn:hover {
  background: #475569;
}
.btn.primary {
  background: var(--primary);
}
.btn.primary:hover {
  background: var(--primary-hover);
}
.table {
  display: flex;
  gap: 8px;
  background: var(--bg-card);
  border-radius: 12px;
  padding: 24px;
  overflow-x: auto;
}
.bucket {
  flex: 1;
  min-width: 90px;
  background: var(--bg);
  border: 2px solid var(--border);
  border-radius: 10px;
  padding: 8px;
  text-align: center;
  transition: border-color 0.2s;
}
.bucket.highlight {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.12);
}
.bucket-index {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 6px;
  font-weight: 600;
}
.chain {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.entry {
  background: var(--primary);
  color: #fff;
  border-radius: 6px;
  padding: 8px 0;
  font-weight: 600;
}
.empty-slot {
  color: var(--text-muted);
  padding: 8px 0;
  opacity: 0.4;
}
.legend {
  display: flex;
  align-items: center;
  gap: 20px;
  color: var(--text-muted);
  font-size: 13px;
}
.legend .dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 3px;
  margin-right: 6px;
  vertical-align: middle;
}
.dot.normal {
  background: var(--bg);
  border: 1px solid var(--border);
}
.dot.highlight {
  background: #f59e0b;
}
.dot.collision {
  background: #ef4444;
}
.stats {
  margin-left: auto;
  color: var(--accent);
}
</style>
