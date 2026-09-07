/**
 * 链表操作
 */

/** 反转链表的步骤：记录每次 prev/curr/next 三个指针的位置 */
export function reverseSteps(values) {
  const steps = []
  const n = values.length
  let prev = -1
  let curr = 0
  while (curr < n) {
    const next = curr + 1 < n ? curr + 1 : -1
    steps.push({ prev, curr, next })
    prev = curr
    curr = next
  }
  return { steps, reversed: [...values].reverse() }
}

/** 生成初始链表 */
export function randomList(count = 5) {
  const values = []
  for (let i = 0; i < count; i++) {
    values.push(Math.floor(Math.random() * 90) + 10)
  }
  return values
}
