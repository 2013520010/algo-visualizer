<template>
  <div class="maze-visualizer">
    <div class="controls">
      <div class="control-group">
        <label>迷宫大小</label>
        <select v-model="size" @change="generate">
          <option :value="12">12×12</option>
          <option :value="16">16×16</option>
          <option :value="20">20×20</option>
        </select>
      </div>
      <div class="control-group">
        <label>速度</label>
        <input type="range" v-model.number="speed" min="1" max="100" />
      </div>
      <button class="btn primary" @click="toggleGenerate">{{ generating ? '暂停生成' : '生成迷宫' }}</button>
      <button class="btn" @click="solve" :disabled="!mazeReady">求解迷宫</button>
      <button class="btn" @click="generate">重新生成</button>
    </div>

    <canvas ref="canvas" class="canvas"></canvas>

    <div class="legend">
      <span><i class="dot wall"></i>墙</span>
      <span><i class="dot current"></i>当前格</span>
      <span><i class="dot path"></i>求解路径</span>
      <span class="stats">{{ statusText }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { generateMaze, solveMaze } from '@/algorithms/maze'

const canvas = ref(null)
const size = ref(16)
const speed = ref(50)

const rows = ref(16)
const cols = ref(16)
const cells = ref([])
const steps = ref([])
const currentStep = ref(0)
const generating = ref(false)
const mazeReady = ref(false)
const solvePath = ref([])
const statusText = ref('')

let rafId = null
let accumulator = 0

function initCells() {
  const g = []
  for (let r = 0; r < rows.value; r++) {
    g[r] = []
    for (let c = 0; c < cols.value; c++) {
      g[r][c] = { row: r, col: c, top: true, right: true, bottom: true, left: true, visited: false, current: false }
    }
  }
  cells.value = g
}

function generate() {
  stopAnimation()
  rows.value = size.value
  cols.value = size.value
  initCells()
  const result = generateMaze(rows.value, cols.value)
  steps.value = result.steps
  currentStep.value = 0
  mazeReady.value = false
  solvePath.value = []
  statusText.value = ''
  draw()
}

function toggleGenerate() {
  if (generating.value) {
    stopAnimation()
    return
  }
  if (currentStep.value >= steps.value.length - 1) generate()
  generating.value = true
  accumulator = 0
  rafId = requestAnimationFrame(tickGenerate)
}

function stopAnimation() {
  generating.value = false
  if (rafId) cancelAnimationFrame(rafId)
  rafId = null
}

function tickGenerate() {
  if (!generating.value) return
  accumulator += speed.value / 15
  const advance = Math.floor(accumulator)
  if (advance > 0) {
    accumulator -= advance
    currentStep.value += advance
    if (currentStep.value >= steps.value.length - 1) {
      currentStep.value = steps.value.length - 1
      stopAnimation()
      mazeReady.value = true
      statusText.value = '✅ 迷宫生成完成，可点击「求解迷宫」'
    }
  }
  applySteps()
  draw()
  if (generating.value) rafId = requestAnimationFrame(tickGenerate)
}

// 将步骤应用到 cells（重放挖墙过程）
function applySteps() {
  // 重新初始化 cells（重新生成时）
  // 每次根据步骤重放，简单起见：从头重放到 currentStep
  const g = []
  for (let r = 0; r < rows.value; r++) {
    g[r] = []
    for (let c = 0; c < cols.value; c++) {
      g[r][c] = { row: r, col: c, top: true, right: true, bottom: true, left: true, visited: false, current: false }
    }
  }
  const dirs = {
    up: { dr: -1, dc: 0, wall: 'top', opposite: 'bottom' },
    down: { dr: 1, dc: 0, wall: 'bottom', opposite: 'top' },
    right: { dr: 0, dc: 1, wall: 'right', opposite: 'left' },
    left: { dr: 0, dc: -1, wall: 'left', opposite: 'right' }
  }
  for (let i = 0; i <= currentStep.value; i++) {
    const s = steps.value[i]
    if (s.type === 'carve') {
      const dr = s.to.row - s.from.row
      const dc = s.to.col - s.from.col
      let wall, opposite
      if (dr === -1) { wall = 'top'; opposite = 'bottom' }
      else if (dr === 1) { wall = 'bottom'; opposite = 'top' }
      else if (dc === 1) { wall = 'right'; opposite = 'left' }
      else { wall = 'left'; opposite = 'right' }
      g[s.from.row][s.from.col][wall] = false
      g[s.to.row][s.to.col][opposite] = false
    } else if (s.type === 'visit' || s.type === 'backtrack') {
      if (s.row >= 0) g[s.row][s.col].current = true
    }
  }
  cells.value = g
}

function solve() {
  if (!mazeReady.value) {
    // 若未完成生成，先完成
    currentStep.value = steps.value.length - 1
    applySteps()
    mazeReady.value = true
  }
  const start = cells.value[0][0]
  const end = cells.value[rows.value - 1][cols.value - 1]
  solvePath.value = solveMaze({ cells: cells.value, rows: rows.value, cols: cols.value }, start, end)
  statusText.value = `✅ 找到路径，长度 ${solvePath.value.length} 格`
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

  ctx.fillStyle = '#1e293b'
  ctx.fillRect(0, 0, w, h)

  const cellW = w / cols.value
  const cellH = h / rows.value

  const pathSet = new Set(solvePath.value.map((c) => c.row + ',' + c.col))

  for (let r = 0; r < rows.value; r++) {
    for (let c = 0; c < cols.value; c++) {
      const cell = cells.value[r][c]
      const x = c * cellW
      const y = r * cellH

      if (pathSet.has(r + ',' + c)) {
        ctx.fillStyle = '#facc15'
        ctx.fillRect(x, y, cellW, cellH)
      } else if (cell.current) {
        ctx.fillStyle = '#6366f1'
        ctx.fillRect(x, y, cellW, cellH)
      } else {
        ctx.fillStyle = '#334155'
        ctx.fillRect(x, y, cellW, cellH)
      }

      // 画墙
      ctx.strokeStyle = '#0f172a'
      ctx.lineWidth = Math.max(cellW, cellH) * 0.25
      ctx.beginPath()
      if (cell.top) {
        ctx.moveTo(x, y)
        ctx.lineTo(x + cellW, y)
      }
      if (cell.right) {
        ctx.moveTo(x + cellW, y)
        ctx.lineTo(x + cellW, y + cellH)
      }
      if (cell.bottom) {
        ctx.moveTo(x, y + cellH)
        ctx.lineTo(x + cellW, y + cellH)
      }
      if (cell.left) {
        ctx.moveTo(x, y)
        ctx.lineTo(x, y + cellH)
      }
      ctx.stroke()
    }
  }

  // 起点终点标记
  ctx.fillStyle = '#22c55e'
  ctx.fillRect(0, 0, cellW, cellH)
  ctx.fillStyle = '#ef4444'
  ctx.fillRect((cols.value - 1) * cellW, (rows.value - 1) * cellH, cellW, cellH)
}

function handleResize() {
  draw()
}

onMounted(() => {
  generate()
  nextTick(() => draw())
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  stopAnimation()
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.maze-visualizer {
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
.control-group input[type='range'] {
  width: 90px;
  accent-color: var(--primary);
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
.canvas {
  width: 100%;
  height: 460px;
  border-radius: 12px;
  background: var(--bg-card);
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
.dot.wall {
  background: #0f172a;
}
.dot.current {
  background: #6366f1;
}
.dot.path {
  background: #facc15;
}
.stats {
  margin-left: auto;
  color: var(--accent);
}
</style>
