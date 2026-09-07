/**
 * 排序算法：每个算法返回一个步骤数组，用于逐步可视化。
 * 步骤格式：{ array, active, sorted }
 *   - array: 当前数组快照
 *   - active: [i, j] 当前比较/交换的索引（高亮为橙色）
 *   - sorted: 已确定最终位置的索引（高亮为绿色）
 */

function makeStep(array, sorted, active = null) {
  return { array: [...array], active, sorted: [...sorted] }
}

/** 冒泡排序 */
export function bubbleSort(input) {
  const a = [...input]
  const sorted = []
  const steps = []
  const n = a.length
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push(makeStep(a, sorted, [j, j + 1]))
      if (a[j] > a[j + 1]) {
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        steps.push(makeStep(a, sorted, [j, j + 1]))
      }
    }
    sorted.push(n - 1 - i)
    steps.push(makeStep(a, sorted))
  }
  sorted.push(0)
  steps.push(makeStep(a, sorted))
  return steps
}

/** 选择排序 */
export function selectionSort(input) {
  const a = [...input]
  const sorted = []
  const steps = []
  const n = a.length
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < n; j++) {
      steps.push(makeStep(a, sorted, [minIdx, j]))
      if (a[j] < a[minIdx]) minIdx = j
    }
    if (minIdx !== i) {
      ;[a[i], a[minIdx]] = [a[minIdx], a[i]]
      steps.push(makeStep(a, sorted, [i, minIdx]))
    }
    sorted.push(i)
    steps.push(makeStep(a, sorted))
  }
  sorted.push(n - 1)
  steps.push(makeStep(a, sorted))
  return steps
}

/** 插入排序 */
export function insertionSort(input) {
  const a = [...input]
  const sorted = []
  const steps = []
  const n = a.length
  for (let i = 1; i < n; i++) {
    const key = a[i]
    let j = i - 1
    steps.push(makeStep(a, sorted, [i, j]))
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j]
      steps.push(makeStep(a, sorted, [j, j + 1]))
      j--
    }
    a[j + 1] = key
    steps.push(makeStep(a, sorted, [j + 1, i]))
  }
  for (let i = 0; i < n; i++) sorted.push(i)
  steps.push(makeStep(a, sorted))
  return steps
}

/** 快速排序 */
export function quickSort(input) {
  const a = [...input]
  const sorted = []
  const steps = []

  function partition(low, high) {
    const pivot = a[high]
    let i = low - 1
    for (let j = low; j < high; j++) {
      steps.push(makeStep(a, sorted, [j, high]))
      if (a[j] < pivot) {
        i++
        if (i !== j) {
          ;[a[i], a[j]] = [a[j], a[i]]
          steps.push(makeStep(a, sorted, [i, j]))
        }
      }
    }
    if (i + 1 !== high) {
      ;[a[i + 1], a[high]] = [a[high], a[i + 1]]
      steps.push(makeStep(a, sorted, [i + 1, high]))
    }
    sorted.push(i + 1)
    steps.push(makeStep(a, sorted))
    return i + 1
  }

  function qs(low, high) {
    if (low < high) {
      const pi = partition(low, high)
      qs(low, pi - 1)
      qs(pi + 1, high)
    } else if (low === high) {
      sorted.push(low)
      steps.push(makeStep(a, sorted))
    }
  }

  qs(0, a.length - 1)
  return steps
}

/** 归并排序 */
export function mergeSort(input) {
  const a = [...input]
  const sorted = []
  const steps = []
  const aux = [...a]

  function merge(lo, mid, hi) {
    for (let k = lo; k <= hi; k++) aux[k] = a[k]
    let i = lo
    let j = mid + 1
    for (let k = lo; k <= hi; k++) {
      if (i > mid) {
        a[k] = aux[j++]
        steps.push(makeStep(a, sorted, [k]))
      } else if (j > hi) {
        a[k] = aux[i++]
        steps.push(makeStep(a, sorted, [k]))
      } else if (aux[j] < aux[i]) {
        steps.push(makeStep(a, sorted, [j, i]))
        a[k] = aux[j++]
        steps.push(makeStep(a, sorted, [k]))
      } else {
        steps.push(makeStep(a, sorted, [i, j]))
        a[k] = aux[i++]
        steps.push(makeStep(a, sorted, [k]))
      }
    }
  }

  function ms(lo, hi) {
    if (lo >= hi) return
    const mid = Math.floor((lo + hi) / 2)
    ms(lo, mid)
    ms(mid + 1, hi)
    merge(lo, mid, hi)
  }

  ms(0, a.length - 1)
  for (let i = 0; i < a.length; i++) sorted.push(i)
  steps.push(makeStep(a, sorted))
  return steps
}

/** 堆排序 */
export function heapSort(input) {
  const a = [...input]
  const sorted = []
  const steps = []
  const n = a.length

  function heapify(size, i) {
    let largest = i
    const l = 2 * i + 1
    const r = 2 * i + 2
    if (l < size) {
      steps.push(makeStep(a, sorted, [l, largest]))
      if (a[l] > a[largest]) largest = l
    }
    if (r < size) {
      steps.push(makeStep(a, sorted, [r, largest]))
      if (a[r] > a[largest]) largest = r
    }
    if (largest !== i) {
      ;[a[i], a[largest]] = [a[largest], a[i]]
      steps.push(makeStep(a, sorted, [i, largest]))
      heapify(size, largest)
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i)
  for (let i = n - 1; i > 0; i--) {
    ;[a[0], a[i]] = [a[i], a[0]]
    steps.push(makeStep(a, sorted, [0, i]))
    sorted.push(i)
    steps.push(makeStep(a, sorted))
    heapify(i, 0)
  }
  sorted.push(0)
  steps.push(makeStep(a, sorted))
  return steps
}

export const sortingAlgorithms = {
  bubble: { name: '冒泡排序', fn: bubbleSort },
  selection: { name: '选择排序', fn: selectionSort },
  insertion: { name: '插入排序', fn: insertionSort },
  quick: { name: '快速排序', fn: quickSort },
  merge: { name: '归并排序', fn: mergeSort },
  heap: { name: '堆排序', fn: heapSort }
}
