<template>
  <div class="sorting-visualizer">
    <div class="controls">
      <div class="control-group">
        <label>算法</label>
        <select v-model="algorithm" @change="reset">
          <option v-for="(a, key) in sortingAlgorithms" :key="key" :value="key">{{ a.name }}</option>
        </select>
      </div>
      <div class="control-group">
        <label>数组大小</label>
        <input type="range" v-model.number="size" min="10" max="150" @input="reset" />
        <span class="value">{{ size }}</span>
      </div>
      <div class="control-group">
        <label>速度</label>
        <input type="range" v-model.number="speed" min="1" max="100" />
        <span class="value">{{ speed }}</span>
      </div>
      <button class="btn primary" @click="togglePlay">{{ playing ? '暂停' : '开始排序' }}</button>
      <button class="btn" @click="reset">重新生成</button>
    </div>

    <canvas ref="canvas" class="canvas"></canvas>

    <div class="legend">
      <span><i class="dot comparing"></i>比较中</span>
      <span><i class="dot sorted"></i>已就位</span>
      <span><i class="dot default"></i>未排序</span>
      <span class="stats">比较/交换次数：{{ steps.length }} · 当前第 {{ currentStep + 1 }} 步</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { sortingAlgorithms } from '@/algorithms/sorting'

const canvas = ref(null)
const algorithm = ref('quick')
const size = ref(60)
const speed = ref(50)

const array = ref([])
const steps = ref([])
const currentStep = ref(0)
const playing = ref(false)

let rafId = null
let stepAccumulator = 0

function randomArray() {
  const arr = []
  for (let i = 0; i < size.value; i++) {
    arr.push(Math.floor(Math.random() * 95) + 5)
  }
  return arr
}

function generateSteps() {
  const fn = sortingAlgorithms[algorithm.value].fn
  steps.value = fn(array.value)
  currentStep.value = 0
}

function reset() {
  stopAnimation()
  array.value = randomArray()
  generateSteps()
  draw()
}

function togglePlay() {
  if (playing.value) {
    stopAnimation()
    return
  }
  if (currentStep.value >= steps.value.length - 1) {
    // 已结束则重新开始
    generateSteps()
  }
  playing.value = true
  stepAccumulator = 0
  rafId = requestAnimationFrame(tick)
}

function stopAnimation() {
  playing.value = false
  if (rafId) cancelAnimationFrame(rafId)
  rafId = null
}

function tick() {
  if (!playing.value) return
  // 速度 1-100 → 每帧推进 0.02 - 3 步
  stepAccumulator += speed.value / 40
  const advance = Math.floor(stepAccumulator)
  if (advance > 0) {
    stepAccumulator -= advance
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

  // 背景
  ctx.fillStyle = '#1e293b'
  ctx.fillRect(0, 0, w, h)

  const step = steps.value[currentStep.value] || { array: array.value, active: null, sorted: [] }
  const arr = step.array
  const n = arr.length
  const barWidth = w / n
  const maxVal = 100
  const active = step.active || []
  const sortedSet = new Set(step.sorted || [])

  for (let i = 0; i < n; i++) {
    const barH = (arr[i] / maxVal) * (h - 20)
    const x = i * barWidth
    const y = h - barH
    let color = '#6366f1'
    if (active.includes(i)) color = '#f97316'
    else if (sortedSet.has(i)) color = '#22c55e'

    ctx.fillStyle = color
    ctx.fillRect(x + 1, y, Math.max(barWidth - 2, 1), barH)
  }
}

function handleResize() {
  draw()
}

onMounted(() => {
  array.value = randomArray()
  generateSteps()
  nextTick(() => {
    draw()
  })
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  stopAnimation()
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.sorting-visualizer {
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
  white-space: nowrap;
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
  width: 100px;
  accent-color: var(--primary);
}
.value {
  color: var(--accent);
  font-size: 13px;
  min-width: 20px;
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
.canvas {
  width: 100%;
  height: 420px;
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
.dot.comparing {
  background: #f97316;
}
.dot.sorted {
  background: #22c55e;
}
.dot.default {
  background: #6366f1;
}
.stats {
  margin-left: auto;
}
</style>
