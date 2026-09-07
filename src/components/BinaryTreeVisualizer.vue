<template>
  <div class="tree-visualizer">
    <div class="controls">
      <div class="control-group">
        <label>遍历方式</label>
        <select v-model="traversal" @change="resetTraversal">
          <option v-for="(t, key) in traversalTypes" :key="key" :value="key">{{ t.name }}</option>
        </select>
      </div>
      <div class="control-group">
        <label>节点数</label>
        <select v-model="nodeCount" @change="generate">
          <option :value="7">7</option>
          <option :value="10">10</option>
          <option :value="15">15</option>
        </select>
      </div>
      <button class="btn primary" @click="startTraversal">开始遍历</button>
      <button class="btn" @click="generate">重新生成</button>
    </div>

    <div class="canvas-wrap">
      <svg ref="svg" class="tree-svg" :viewBox="`0 0 ${width} ${height}`">
        <g v-if="root">
          <line
            v-for="(e, i) in edges"
            :key="'e' + i"
            :x1="posMap[e.from]?.x"
            :y1="posMap[e.from]?.y"
            :x2="posMap[e.to]?.x"
            :y2="posMap[e.to]?.y"
            stroke="#475569"
            stroke-width="2"
          />
          <g v-for="(n, i) in nodes" :key="'n' + i">
            <circle
              :cx="n.x"
              :cy="n.y"
              :r="18"
              :fill="nodeColor(n.value)"
              :stroke="highlighted.has(n.value) ? '#fff' : 'none'"
              stroke-width="2"
            />
            <text :x="n.x" :y="n.y" text-anchor="middle" dominant-baseline="central" fill="#fff" font-size="13" font-weight="600">
              {{ n.value }}
            </text>
          </g>
        </g>
      </svg>
    </div>

    <div class="legend">
      <span><i class="dot normal"></i>未访问</span>
      <span><i class="dot visited"></i>已访问</span>
      <span class="stats">{{ traversalOrder.length ? `遍历序列：${traversalOrder.join(' → ')}` : ' ' }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { buildBST, traversalTypes } from '@/algorithms/tree'

const svg = ref(null)
const traversal = ref('inorder')
const nodeCount = ref(10)
const width = 900
const height = 420

const root = ref(null)
const nodes = ref([])
const edges = ref([])
const posMap = reactive({})
const highlighted = reactive(new Set())
const traversalOrder = ref([])

let animTimer = null

function generate() {
  stopAnim()
  const values = []
  const set = new Set()
  while (set.size < nodeCount.value) {
    set.add(Math.floor(Math.random() * 90) + 10)
  }
  for (const v of set) values.push(v)
  root.value = buildBST(values)
  computeLayout()
  resetTraversal()
}

function computeLayout() {
  const positions = {}
  const es = []
  let xCounter = 0
  let maxDepth = 0

  function assign(node, depth) {
    if (!node) return
    assign(node.left, depth + 1)
    positions[node.value] = { x: xCounter++, y: depth }
    maxDepth = Math.max(maxDepth, depth)
    if (node.left) es.push({ from: node.value, to: node.left.value })
    if (node.right) es.push({ from: node.value, to: node.right.value })
    assign(node.right, depth + 1)
  }
  assign(root.value, 0)

  const count = xCounter
  const ns = []
  for (const value in positions) {
    const p = positions[value]
    const px = ((p.x + 1) / (count + 1)) * width
    const py = ((p.y + 1) / (maxDepth + 2)) * height
    posMap[value] = { x: px, y: py }
    ns.push({ value: Number(value), x: px, y: py })
  }
  nodes.value = ns
  edges.value = es
}

function resetTraversal() {
  stopAnim()
  highlighted.clear()
  traversalOrder.value = []
}

function nodeColor(value) {
  if (highlighted.has(value)) return '#f59e0b'
  return '#6366f1'
}

function startTraversal() {
  resetTraversal()
  const order = traversalTypes[traversal.value].fn(root.value)
  traversalOrder.value = order
  let i = 0
  animTimer = setInterval(() => {
    if (i >= order.length) {
      clearInterval(animTimer)
      return
    }
    highlighted.add(order[i])
    i++
  }, 500)
}

function stopAnim() {
  if (animTimer) clearInterval(animTimer)
  animTimer = null
}

onMounted(generate)
</script>

<style scoped>
.tree-visualizer {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.controls {
  display: flex;
  align-items: center;
  gap: 20px;
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
.canvas-wrap {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 12px;
}
.tree-svg {
  width: 100%;
  height: auto;
  display: block;
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
  border-radius: 50%;
  margin-right: 6px;
  vertical-align: middle;
}
.dot.normal {
  background: #6366f1;
}
.dot.visited {
  background: #f59e0b;
}
.stats {
  margin-left: auto;
  color: var(--text-muted);
}
</style>
