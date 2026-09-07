<template>
  <div class="nqueens-visualizer">
    <div class="controls">
      <div class="control-group">
        <label>棋盘大小</label>
        <select v-model="n" @change="reset">
          <option v-for="i in [4, 5, 6, 8, 10]" :key="i" :value="i">{{ i }} × {{ i }}</option>
        </select>
      </div>
      <div class="control-group">
        <label>速度</label>
        <input type="range" v-model.number="speed" min="1" max="100" />
      </div>
      <button class="btn primary" @click="togglePlay">{{ playing ? '暂停' : '开始求解' }}</button>
      <button class="btn" @click="reset">重置</button>
    </div>

    <canvas ref="canvas" class="canvas"></canvas>

    <div class="legend">
      <span><i class="dot queen"></i>已放置皇后</span>
      <span><i class="dot checking"></i>当前检查</span>
      <span><i class="dot conflict"></i>冲突</span>
      <span class="stats">{{ done ? '✅ 找到解！' : `已放置 ${queens.length} 个皇后` }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { solveNQueens } from '@/algorithms/backtracking'

const canvas = ref(null)
const n = ref(8)
const speed = ref(50)

const steps = ref([])
const currentStep = ref(0)
const playing = ref(false)

let rafId = null
let accumulator = 0

const queens = ref([])
const done = ref(false)

function generateSteps() {
  steps.value = solveNQueens(n.value)
  currentStep.value = 0
  queens.value = []
  done.value = false
}

function reset() {
  stopAnimation()
  generateSteps()
  draw()
}

function togglePlay() {
  if (playing.value) {
    stopAnimation()
    return
  }
  if (currentStep.value >= steps.value.length - 1) generateSteps()
  playing.value = true
  accumulator = 0
  rafId = requestAnimationFrame(tick)
}

function stopAnimation() {
  playing.value = false
  if (rafId) cancelAnimationFrame(rafId)
  rafId = null
}

function tick() {
  if (!playing.value) return
  accumulator += speed.value / 20
  const advance = Math.floor(accumulator)
  if (advance > 0) {
    accumulator -= advance
    currentStep.value += advance
    if (currentStep.value >= steps.value.length - 1) {
      currentStep.value = steps.value.length - 1
      stopAnimation()
    }
  }
  draw()
  if (playing.value) rafId = requestAnimationFrame(tick)
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

  const size = n.value
  const cell = Math.min(w, h) / size
  const offsetX = (w - cell * size) / 2
  const offsetY = (h - cell * size) / 2

  const step = steps.value[currentStep.value] || { queens: [], type: 'idle' }
  const currentQueens = step.queens || []
  queens.value = currentQueens
  done.value = step.type === 'done'

  // 冲突检测：与当前检查格子冲突的皇后
  const conflictSet = new Set()
  const cur = step.type === 'check' ? { row: step.row, col: step.col } : null
  for (const q of currentQueens) {
    if (cur && (q.col === cur.col || Math.abs(q.col - cur.col) === Math.abs(q.row - cur.row))) {
      conflictSet.add(q.row + ',' + q.col)
    }
  }

  // 棋盘格子
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const x = offsetX + c * cell
      const y = offsetY + r * cell
      const isDark = (r + c) % 2 === 0
      ctx.fillStyle = isDark ? '#334155' : '#475569'
      ctx.fillRect(x, y, cell, cell)

      // 当前检查格子高亮
      if (cur && cur.row === r && cur.col === c) {
        ctx.fillStyle = '#f59e0b'
        ctx.fillRect(x, y, cell, cell)
      }
      // 冲突高亮
      if (conflictSet.has(r + ',' + c)) {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.6)'
        ctx.fillRect(x, y, cell, cell)
      }
    }
  }

  // 皇后
  ctx.font = `${cell * 0.7}px serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (const q of currentQueens) {
    const x = offsetX + q.col * cell + cell / 2
    const y = offsetY + q.row * cell + cell / 2
    ctx.fillText('♛', x, y)
  }
}

function handleResize() {
  draw()
}

onMounted(() => {
  generateSteps()
  nextTick(() => draw())
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  stopAnimation()
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.nqueens-visualizer {
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
.dot.queen {
  background: #22d3ee;
}
.dot.checking {
  background: #f59e0b;
}
.dot.conflict {
  background: #ef4444;
}
.stats {
  margin-left: auto;
  color: var(--accent);
}
</style>
