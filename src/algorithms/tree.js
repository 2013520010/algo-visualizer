/**
 * 二叉树（二叉搜索树 BST）与遍历
 */

export class TreeNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

/** 向 BST 插入节点 */
export function insertBST(root, value) {
  if (!root) return new TreeNode(value)
  if (value < root.value) root.left = insertBST(root.left, value)
  else root.right = insertBST(root.right, value)
  return root
}

/** 由值数组构建 BST */
export function buildBST(values) {
  let root = null
  for (const v of values) root = insertBST(root, v)
  return root
}

/** 计算树的层级布局（用于 SVG 渲染） */
export function layoutTree(root) {
  const nodes = []
  const edges = []
  const depthMap = new Map()

  function dfs(node, depth, pos) {
    if (!node) return 0
    const leftCount = dfs(node.left, depth + 1, pos)
    const rightCount = dfs(node.right, depth + 1, pos)
    // 中序分配 x 坐标
    const x = pos.count
    pos.count++
    const info = { value: node.value, depth, x }
    nodes.push(info)
    depthMap.set(node, info)
    if (node.left) edges.push({ from: node.value, to: node.left.value })
    if (node.right) edges.push({ from: node.value, to: node.right.value })
    return leftCount + rightCount + 1
  }

  const pos = { count: 0 }
  dfs(root, 0, pos)

  // 计算每层节点数，用于均匀分布 x
  const count = nodes.length
  return { nodes, edges, count }
}

/** 遍历顺序（返回节点值的访问序列） */
export function traverseOrder(root, type) {
  const order = []
  function preorder(node) {
    if (node) {
      order.push(node.value)
      preorder(node.left)
      preorder(node.right)
    }
  }
  function inorder(node) {
    if (node) {
      inorder(node.left)
      order.push(node.value)
      inorder(node.right)
    }
  }
  function postorder(node) {
    if (node) {
      postorder(node.left)
      postorder(node.right)
      order.push(node.value)
    }
  }
  function levelorder(node) {
    if (!node) return
    const q = [node]
    while (q.length) {
      const cur = q.shift()
      order.push(cur.value)
      if (cur.left) q.push(cur.left)
      if (cur.right) q.push(cur.right)
    }
  }

  if (type === 'preorder') preorder(root)
  else if (type === 'inorder') inorder(root)
  else if (type === 'postorder') postorder(root)
  else levelorder(root)
  return order
}

export const traversalTypes = {
  preorder: { name: '前序遍历（根左右）', fn: (r) => traverseOrder(r, 'preorder') },
  inorder: { name: '中序遍历（左根右）', fn: (r) => traverseOrder(r, 'inorder') },
  postorder: { name: '后序遍历（左右根）', fn: (r) => traverseOrder(r, 'postorder') },
  levelorder: { name: '层序遍历（逐层）', fn: (r) => traverseOrder(r, 'levelorder') }
}
