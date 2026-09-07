/**
 * 寻路算法：在网格上搜索从起点到终点的路径。
 * 每个算法返回 { visited, path }
 *   - visited: 按探索顺序访问的格子数组
 *   - path: 最终找到的最短路径（格子数组，含起点终点）
 */

function key(cell) {
  return cell.row + ',' + cell.col
}

function getNeighbors(grid, cell) {
  const { row, col } = cell
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ]
  const neighbors = []
  for (const [dr, dc] of dirs) {
    const r = row + dr
    const c = col + dc
    if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length && !grid[r][c].isWall) {
      neighbors.push(grid[r][c])
    }
  }
  return neighbors
}

function reconstruct(prev, start, end) {
  const path = []
  let cur = end
  while (cur) {
    path.push(cur)
    if (key(cur) === key(start)) break
    cur = prev.get(key(cur))
  }
  return path.reverse()
}

/** 广度优先搜索 */
export function bfs(grid, start, end) {
  const visited = []
  const visitedSet = new Set()
  const prev = new Map()
  const queue = [start]
  visitedSet.add(key(start))

  while (queue.length) {
    const cur = queue.shift()
    visited.push(cur)
    if (key(cur) === key(end)) break
    for (const nb of getNeighbors(grid, cur)) {
      const k = key(nb)
      if (!visitedSet.has(k)) {
        visitedSet.add(k)
        prev.set(k, cur)
        queue.push(nb)
      }
    }
  }
  return { visited, path: reconstruct(prev, start, end) }
}

/** 深度优先搜索 */
export function dfs(grid, start, end) {
  const visited = []
  const visitedSet = new Set()
  const prev = new Map()
  const stack = [start]
  visitedSet.add(key(start))

  while (stack.length) {
    const cur = stack.pop()
    visited.push(cur)
    if (key(cur) === key(end)) break
    const neighbors = getNeighbors(grid, cur)
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const nb = neighbors[i]
      const k = key(nb)
      if (!visitedSet.has(k)) {
        visitedSet.add(k)
        prev.set(k, cur)
        stack.push(nb)
      }
    }
  }
  return { visited, path: reconstruct(prev, start, end) }
}

/** 最小堆优先队列 */
class MinHeap {
  constructor() {
    this.heap = []
  }
  push(item) {
    this.heap.push(item)
    this.bubbleUp(this.heap.length - 1)
  }
  pop() {
    const top = this.heap[0]
    const last = this.heap.pop()
    if (this.heap.length > 0) {
      this.heap[0] = last
      this.bubbleDown(0)
    }
    return top
  }
  isEmpty() {
    return this.heap.length === 0
  }
  bubbleUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2)
      if (this.heap[i].priority < this.heap[parent].priority) {
        ;[this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]]
        i = parent
      } else break
    }
  }
  bubbleDown(i) {
    const n = this.heap.length
    while (true) {
      let smallest = i
      const l = 2 * i + 1
      const r = 2 * i + 2
      if (l < n && this.heap[l].priority < this.heap[smallest].priority) smallest = l
      if (r < n && this.heap[r].priority < this.heap[smallest].priority) smallest = r
      if (smallest !== i) {
        ;[this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]]
        i = smallest
      } else break
    }
  }
}

/** Dijkstra 算法（网格边权均为 1，等价于带权 BFS） */
export function dijkstra(grid, start, end) {
  const visited = []
  const visitedSet = new Set()
  const dist = new Map()
  const prev = new Map()
  const pq = new MinHeap()
  dist.set(key(start), 0)
  pq.push({ cell: start, priority: 0 })

  while (!pq.isEmpty()) {
    const { cell } = pq.pop()
    const k = key(cell)
    if (visitedSet.has(k)) continue
    visitedSet.add(k)
    visited.push(cell)
    if (k === key(end)) break
    for (const nb of getNeighbors(grid, cell)) {
      const nk = key(nb)
      const nd = dist.get(k) + 1
      if (nd < (dist.get(nk) ?? Infinity)) {
        dist.set(nk, nd)
        prev.set(nk, cell)
        pq.push({ cell: nb, priority: nd })
      }
    }
  }
  return { visited, path: reconstruct(prev, start, end) }
}

/** A* 算法（Dijkstra + 曼哈顿距离启发式） */
export function astar(grid, start, end) {
  const visited = []
  const visitedSet = new Set()
  const gScore = new Map()
  const prev = new Map()
  const pq = new MinHeap()
  const heuristic = (cell) => Math.abs(cell.row - end.row) + Math.abs(cell.col - end.col)

  gScore.set(key(start), 0)
  pq.push({ cell: start, priority: heuristic(start) })

  while (!pq.isEmpty()) {
    const { cell } = pq.pop()
    const k = key(cell)
    if (visitedSet.has(k)) continue
    visitedSet.add(k)
    visited.push(cell)
    if (k === key(end)) break
    for (const nb of getNeighbors(grid, cell)) {
      const nk = key(nb)
      const tentative = gScore.get(k) + 1
      if (tentative < (gScore.get(nk) ?? Infinity)) {
        gScore.set(nk, tentative)
        prev.set(nk, cell)
        pq.push({ cell: nb, priority: tentative + heuristic(nb) })
      }
    }
  }
  return { visited, path: reconstruct(prev, start, end) }
}

export const pathfindingAlgorithms = {
  bfs: { name: '广度优先 BFS', fn: bfs },
  dfs: { name: '深度优先 DFS', fn: dfs },
  dijkstra: { name: 'Dijkstra', fn: dijkstra },
  astar: { name: 'A* 寻路', fn: astar }
}
