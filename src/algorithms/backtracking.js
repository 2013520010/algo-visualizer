/**
 * N 皇后回溯算法：逐步记录放置/检查/回溯过程。
 * 步骤格式：{ type, row, col, queens }
 *   - type: 'check' 检查该格 | 'place' 放置皇后 | 'remove' 回溯移除 | 'done' 找到解
 *   - queens: 当前已放置的皇后 [{row, col}, ...]
 */

export function solveNQueens(n) {
  const steps = []
  const queens = []

  function isSafe(row, col) {
    for (const q of queens) {
      if (q.col === col || Math.abs(q.col - col) === Math.abs(q.row - row)) {
        return false
      }
    }
    return true
  }

  function backtrack(row) {
    if (row === n) {
      steps.push({ type: 'done', row: -1, col: -1, queens: queens.map((q) => ({ ...q })) })
      return true
    }
    for (let col = 0; col < n; col++) {
      steps.push({ type: 'check', row, col, queens: queens.map((q) => ({ ...q })) })
      if (isSafe(row, col)) {
        queens.push({ row, col })
        steps.push({ type: 'place', row, col, queens: queens.map((q) => ({ ...q })) })
        if (backtrack(row + 1)) return true
        queens.pop()
        steps.push({ type: 'remove', row, col, queens: queens.map((q) => ({ ...q })) })
      }
    }
    return false
  }

  backtrack(0)
  return steps
}
