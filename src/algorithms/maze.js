/**
 * 迷宫生成算法（递归回溯 / DFS）。
 * 网格中每个格子记录四面的墙，逐步「挖墙」打通通道。
 * 步骤格式：{ type, row, col, from, to }
 *   - type: 'visit' 当前格子 | 'carve' 打通 from→to 之间的墙 | 'backtrack' 回溯到该格 | 'done'
 */

export function generateMaze(rows, cols) {
  // 初始化格子
  const cells = []
  for (let r = 0; r < rows; r++) {
    cells[r] = []
    for (let c = 0; c < cols; c++) {
      cells[r][c] = {
        row: r,
        col: c,
        top: true,
        right: true,
        bottom: true,
        left: true,
        visited: false
      }
    }
  }

  const steps = []
  const stack = []
  let current = cells[0][0]
  current.visited = true
  stack.push(current)
  steps.push({ type: 'visit', row: 0, col: 0 })

  const dirs = [
    { dr: -1, dc: 0, wall: 'top', opposite: 'bottom' },
    { dr: 1, dc: 0, wall: 'bottom', opposite: 'top' },
    { dr: 0, dc: 1, wall: 'right', opposite: 'left' },
    { dr: 0, dc: -1, wall: 'left', opposite: 'right' }
  ]

  function getUnvisitedNeighbor(cell) {
    const options = []
    for (const d of dirs) {
      const r = cell.row + d.dr
      const c = cell.col + d.dc
      if (r >= 0 && r < rows && c >= 0 && c < cols && !cells[r][c].visited) {
        options.push({ cell: cells[r][c], ...d })
      }
    }
    if (options.length === 0) return null
    return options[Math.floor(Math.random() * options.length)]
  }

  function removeWall(a, b, wall, opposite) {
    a[wall] = false
    b[opposite] = false
  }

  while (stack.length) {
    const next = getUnvisitedNeighbor(current)
    if (next) {
      stack.push(current)
      removeWall(current, next.cell, next.wall, next.opposite)
      next.cell.visited = true
      steps.push({
        type: 'carve',
        row: next.cell.row,
        col: next.cell.col,
        from: { row: current.row, col: current.col },
        to: { row: next.cell.row, col: next.cell.col }
      })
      current = next.cell
    } else {
      current = stack.pop()
      if (current) {
        steps.push({ type: 'backtrack', row: current.row, col: current.col })
      }
    }
  }
  steps.push({ type: 'done', row: -1, col: -1 })
  return { steps, rows, cols, cells }
}

/**
 * 用 BFS 求解迷宫，返回路径格子序列
 */
export function solveMaze(maze, start, end) {
  const { rows, cols } = maze
  // 根据墙信息求相邻格子
  const grid = []
  for (let r = 0; r < rows; r++) {
    grid[r] = []
    for (let c = 0; c < cols; c++) {
      grid[r][c] = maze.cells[r][c]
    }
  }

  function canMove(from, to) {
    if (to.row === from.row - 1) return !from.top
    if (to.row === from.row + 1) return !from.bottom
    if (to.col === from.col + 1) return !from.right
    if (to.col === from.col - 1) return !from.left
    return false
  }

  function neighbors(cell) {
    const result = []
    const dirs = [
      { dr: -1, dc: 0 },
      { dr: 1, dc: 0 },
      { dr: 0, dc: 1 },
      { dr: 0, dc: -1 }
    ]
    for (const d of dirs) {
      const r = cell.row + d.dr
      const c = cell.col + d.dc
      if (r >= 0 && r < rows && c >= 0 && c < cols && canMove(cell, grid[r][c])) {
        result.push(grid[r][c])
      }
    }
    return result
  }

  const key = (c) => c.row + ',' + c.col
  const queue = [start]
  const visited = new Set([key(start)])
  const prev = new Map()

  while (queue.length) {
    const cur = queue.shift()
    if (key(cur) === key(end)) break
    for (const nb of neighbors(cur)) {
      const k = key(nb)
      if (!visited.has(k)) {
        visited.add(k)
        prev.set(k, cur)
        queue.push(nb)
      }
    }
  }

  const path = []
  let cur = end
  while (cur) {
    path.push(cur)
    if (key(cur) === key(start)) break
    cur = prev.get(key(cur))
  }
  return path.reverse()
}
