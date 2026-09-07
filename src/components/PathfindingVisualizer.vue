<template>
  <div class="pathfinding-visualizer">
    <div class="controls">
      <div class="control-group">
        <label>算法</label>
        <select v-model="algorithm" @change="clearPath">
          <option v-for="(a, key) in pathfindingAlgorithms" :key="key" :value="key">{{ a.name }}</option>
        </select>
      </div>
      <div class="mode-group">
        <button class="mode-btn" :class="{ active: mode === 'wall' }" @click="mode = 'wall'">🧱 画墙</button>
        <button class="mode-btn" :class="{ active: mode === 'start' }" @click="mode = 'start'">🟢 起点</button>
        <button class="mode-btn" :class="{ active: mode === 'end' }" @click="mode = 'end'">🔴 终点</button>
      </div>
      <div class="control-group">
        <label>速度</label>
        <input type="range" v-model.number="speed" min="1" max="100" />
      </div>
      <button class="btn primary" @click="startSearch" :disabled="running">{{ running ? '寻路中…' : '开始寻路' }}</button>
      <button class="btn" @click="clearPath">清除路径</button>
      <button class="btn" @click="clearAll">重置网格</button>
    </div>

    <canvas ref="canvas" class="canvas" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp" @mouseleave="onMouseUp"></canvas>

    <div class="legend">
      <span><i class="cell start"></i>起点</span>
      <span><i class="cell end"></i>终点</span>
      <span><i class="cell wall"></i>墙</span>
      <span><i class="cell visited"></i>已探索</span>
      <span><i class="cell path"></i>最短路径</span>
      <span class="stats">{{ pathFound ? `路径长度：${path.length} 格` : ' ' }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { pathfindingAlgorithms } from '@/algorithms/pathfinding'

const ROWS = 20
const COLS = 40

const canvas = ref(null)
const algorithm = ref('astar')
const speed = ref(50)
const mode = ref('wall')
const running = ref(false)
const pathFound = ref(false)

const grid = ref([])
const start = reactive({ row: 10, col: 7 })
const end = reactive({ row: 10, col: 32 })
const visitedOrder = ref([])
const path = ref([])

let rafId = null
let accumulator = 0
let revealIndex = 0
let phase = 'idle' // idle | visiting | pathing
let dragging = false

function initGrid() {
  const g = []
  for (let r = 0; r < ROWS; r++) {
    const row = []
    for (let c = 0; c < COLS; c++) {
      row.push({ row: r, col: c, isWall: false })
    }
    g.push(row)
  }
  grid.value = g
}

function clearPath() {
  stopAnimation()
  visitedOrder.value = []
  path.value = []
  pathFound.value = false
  revealIndex = 0
  phase = 'idle'
  draw()
}

function clearAll() {
  stopAnimation()
  initGrid()
  visitedOrder.value = []
  path.value = []
  pathFound.value = false
  revealIndex = 0
  phase = 'idle'
  draw()
}

function startSearch() {
  if (running.value) return
  clearPath()
  const fn = pathfindingAlgorithms[algorithm.value].fn
  const result = fn(grid.value, grid.value[start.row][start.col], grid.value[end.row][end.col])
  visitedOrder.value = result.visited
  path.value = result.path
  pathFound.value = result.path.length > 0 && result.path[result.path.length - 1] === grid.value[end.row][end.col]
  revealIndex = 0
  phase = 'visiting'
  running.value = true
  accumulator = 0
  rafId = requestAnimationFrame(tick)
}

function stopAnimation() {
  running.value = false
  if (rafId) cancelAnimationFrame(rafId)
  rafId = null
}

function tick() {
  if (!running.value) return
  accumulator += speed.value / 30
  const advance = Math.floor(accumulator)
  if (phase === 'visiting') {
    if (advance > 0) {
      accumulator -= advance
      revealIndex += advance
      if (revealIndex >= visitedOrder.value.length) {
        revealIndex = visitedOrder.value.length
        phase = 'pathing'
        accumulator = 0
      }
    }
  } else if (phase === 'pathing') {
    // 路径一次性绘制
    phase = 'done'
    running.value = false
  }
  draw()
  if (running.value) rafId = requestAnimationFrame(tick)
}

function cellFromEvent(e) {
  const el = canvas.value
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const cellW = rect.width / COLS
  const cellH = rect.height / ROWS
  const col = Math.floor(x / cellW)
  const row = Math.floor(y / cellH)
  if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return null
  return { row, col }
}

function onMouseDown(e) {
  dragging = true
  applyInteraction(e)
}

function onMouseMove(e) {
  if (dragging) applyInteraction(e)
}

function onMouseUp() {
  dragging = false
}

function applyInteraction(e) {
  const cell = cellFromEvent(e)
  if (!cell) return
  const { row, col } = cell
  if (running.value) return
  if (mode.value === 'start') {
    start.row = row
    start.col = col
  } else if (mode.value === 'end') {
    end.row = row
    end.col = col
  } else {
    // 画墙（不能画在起点终点上）
    if ((row === start.row && col === start.col) || (row === end.row && col === end.col)) return
    grid.value[row][col].isWall = true
  }
  draw()
}

function draw() {
  const el = canvas.value
  if (!el) return
  const ctx = el.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const w = el.clientWidth
  const h = el.clientHeight
  el.width = w * dpr
  el.height = h * dpr
  ctx.scale(dpr, dpr)

  const cellW = w / COLS
  const cellH = h / ROWS

  ctx.fillStyle = '#1e293b'
  ctx.fillRect(0, 0, w, h)

  const visitedSet = new Set()
  for (let i = 0; i < revealIndex && i < visitedOrder.value.length; i++) {
    const c = visitedOrder.value[i]
    visitedSet.add(c.row + ',' + c.col)
  }
  const pathSet = new Set()
  if (phase === 'done' || phase === 'pathing') {
    path.value.forEach((c) => pathSet.add(c.row + ',' + c.col))
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x = c * cellW
      const y = r * cellH
      const key = r + ',' + c
      const isStart = r === start.row && c === start.col
      const isEnd = r === end.row && c === end.col
      const cell = grid.value[r][c]

      let color = '#334155'
      if (cell.isWall) color = '#0f172a'
      else if (isStart) color = '#22c55e'
      else if (isEnd) color = '#ef4444'
      else if (pathSet.has(key)) color = '#facc15'
      else if (visitedSet.has(key)) color = '#6366f1'

      ctx.fillStyle = color
      ctx.fillRect(x + 1, y + 1, cellW - 2, cellH - 2)
    }
  }

  // 网格线
  ctx.strokeStyle = 'rgba(30,41,59,0.4)'
  ctx.lineWidth = 1
  for (let c = 0; c <= COLS; c++) {
    ctx.beginPath()
    ctx.moveTo(c * cellW, 0)
    ctx.lineTo(c * cellW, h)
    ctx.stroke()
  }
  for (let r = 0; r <= ROWS; r++) {
    ctx.beginPath()
    ctx.moveTo(0, r * cellH)
    ctx.lineTo(w, r * cellH)
    ctx.stroke()
  }
}

function handleResize() {
  draw()
}

onMounted(() => {
  initGrid()
  nextTick(() => draw())
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  stopAnimation()
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.pathfinding-visualizer {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.controls {
  display: flex;
  align-items: center;
  gap: 18px;
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
.control-group input[type='range'] {
  width: 90px;
  accent-color: var(--primary);
}
.mode-group {
  display: flex;
  gap: 6px;
}
.mode-btn {
  background: var(--bg);
  color: var(--text-muted);
  padding: 7px 12px;
  border-radius: 8px;
  font-size: 13px;
  border: 1px solid var(--border);
}
.mode-btn.active {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}
.btn {
  background: var(--bg-hover);
  color: var(--text);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  transition: background 0.2s;
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
  opacity: 0.6;
  cursor: not-allowed;
}
.canvas {
  width: 100%;
  height: 460px;
  border-radius: 12px;
  background: var(--bg-card);
  cursor: crosshair;
}
.legend {
  display: flex;
  align-items: center;
  gap: 18px;
  color: var(--text-muted);
  font-size: 13px;
}
.legend .cell {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 3px;
  margin-right: 6px;
  vertical-align: middle;
}
.cell.start {
  background: #22c55e;
}
.cell.end {
  background: #ef4444;
}
.cell.wall {
  background: #0f172a;
}
.cell.visited {
  background: #6366f1;
}
.cell.path {
  background: #facc15;
}
.stats {
  margin-left: auto;
}
</style>
