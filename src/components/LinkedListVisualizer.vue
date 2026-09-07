<template>
  <div class="linkedlist-visualizer">
    <div class="controls">
      <button class="btn" @click="insertHead">头插节点</button>
      <button class="btn" @click="insertTail">尾插节点</button>
      <button class="btn" @click="deleteHead" :disabled="values.length === 0">删除头节点</button>
      <button class="btn primary" @click="startReverse" :disabled="values.length < 2 || reversing">反转链表</button>
      <button class="btn" @click="resetList">重置</button>
    </div>

    <div class="list-container">
      <div class="list">
        <template v-for="(v, i) in displayValues" :key="i">
          <div class="node" :class="nodeClass(i)">
            <div class="node-value">{{ v }}</div>
            <div class="node-label">{{ nodeLabel(i) }}</div>
          </div>
          <div v-if="i < displayValues.length - 1" class="arrow">→</div>
        </template>
        <div v-if="displayValues.length === 0" class="empty">链表为空</div>
      </div>
    </div>

    <div class="legend">
      <span><i class="dot head"></i>头节点</span>
      <span><i class="dot tail"></i>尾节点</span>
      <span><i class="dot curr"></i>当前(反转)</span>
      <span><i class="dot prev"></i>prev</span>
      <span><i class="dot next"></i>next</span>
      <span class="stats">{{ status }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { reverseSteps, randomList } from '@/algorithms/linkedlist'

const values = ref([])
const reversing = ref(false)
const status = ref('')
const revHighlight = ref({ prev: -1, curr: -1, next: -1 })
const reversedList = ref([])

let animTimer = null

const displayValues = computed(() => (reversing.value ? reversedList.value : values.value))

function resetList() {
  stopAnim()
  values.value = randomList(5)
  reversing.value = false
  reversedList.value = []
  revHighlight.value = { prev: -1, curr: -1, next: -1 }
  status.value = ''
}

function stopAnim() {
  if (animTimer) clearInterval(animTimer)
  animTimer = null
}

function insertHead() {
  const v = Math.floor(Math.random() * 90) + 10
  values.value = [v, ...values.value]
  status.value = `头插 ${v}`
}

function insertTail() {
  const v = Math.floor(Math.random() * 90) + 10
  values.value = [...values.value, v]
  status.value = `尾插 ${v}`
}

function deleteHead() {
  const removed = values.value[0]
  values.value = values.value.slice(1)
  status.value = `删除头节点 ${removed}`
}

function startReverse() {
  if (reversing.value || values.value.length < 2) return
  reversing.value = true
  const { steps, reversed } = reverseSteps(values.value)
  reversedList.value = [...values.value]
  status.value = '反转中…'

  let i = 0
  animTimer = setInterval(() => {
    if (i >= steps.length) {
      clearInterval(animTimer)
      values.value = reversed
      reversing.value = false
      revHighlight.value = { prev: -1, curr: -1, next: -1 }
      status.value = '✅ 反转完成'
      return
    }
    revHighlight.value = steps[i]
    // 逐步构建反转后的列表
    const step = steps[i]
    if (step.prev >= 0 && step.curr >= 0) {
      // 可视化指针移动即可，最终一次性反转
    }
    i++
  }, 700)
}

function nodeClass(i) {
  const cls = []
  if (i === 0) cls.push('head-node')
  if (i === displayValues.value.length - 1) cls.push('tail-node')
  if (reversing.value) {
    if (i === revHighlight.value.curr) cls.push('curr-node')
    else if (i === revHighlight.value.prev) cls.push('prev-node')
    else if (i === revHighlight.value.next) cls.push('next-node')
  }
  return cls
}

function nodeLabel(i) {
  if (reversing.value) {
    if (i === revHighlight.value.curr) return 'curr'
    if (i === revHighlight.value.prev) return 'prev'
    if (i === revHighlight.value.next) return 'next'
  }
  if (i === 0) return 'head'
  return ''
}

resetList()
</script>

<style scoped>
.linkedlist-visualizer {
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
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.list-container {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 40px 24px;
  overflow-x: auto;
}
.list {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-height: 100px;
}
.node {
  background: var(--bg);
  border: 2px solid var(--border);
  border-radius: 10px;
  padding: 12px 18px;
  text-align: center;
  min-width: 70px;
  transition: all 0.2s;
}
.node-value {
  font-size: 20px;
  font-weight: 700;
}
.node-label {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 2px;
  min-height: 14px;
}
.head-node {
  border-color: #22c55e;
}
.tail-node {
  border-color: #f59e0b;
}
.curr-node {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.2);
}
.prev-node {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.2);
}
.next-node {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.2);
}
.arrow {
  color: var(--text-muted);
  font-size: 22px;
  padding: 0 2px;
}
.empty {
  color: var(--text-muted);
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
.dot.head {
  background: #22c55e;
}
.dot.tail {
  background: #f59e0b;
}
.dot.curr {
  background: #f59e0b;
}
.dot.prev {
  background: #22c55e;
}
.dot.next {
  background: #ef4444;
}
.stats {
  margin-left: auto;
  color: var(--accent);
}
</style>
