<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.4-42b883" alt="vue">
  <img src="https://img.shields.io/badge/Vite-5-646cff" alt="vite">
  <img src="https://img.shields.io/badge/Canvas-动画-f97316" alt="canvas">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="license">
</p>

<h1 align="center">🧮 Algo Visualizer · 算法可视化</h1>

<p align="center">一个交互式<b>算法与数据结构可视化</b>平台，让抽象算法变得直观可见。</p>

<p align="center">
  <a href="#-功能特性">功能特性</a> ·
  <a href="#-支持的算法">支持的算法</a> ·
  <a href="#-快速开始">快速开始</a> ·
  <a href="#-项目结构">项目结构</a>
</p>

---

## ✨ 功能特性

| 模块 | 说明 |
|------|------|
| 📊 **排序可视化** | 柱状图动画，6 种经典排序算法，比较/交换实时高亮 |
| 🗺️ **寻路可视化** | 网格地图，4 种寻路算法，自由绘制障碍、拖动起终点 |
| ♛ **回溯算法** | N 皇后回溯、迷宫生成与求解 |
| 🌳 **数据结构** | 二叉树遍历、链表操作、哈希表 |
| ⚡ **可调速动画** | 速度滑块自由调节，暂停/继续 |
| 🎨 **暗色主题** | 现代化暗色 UI，Canvas 60fps 渲染 |

## 🖼 界面预览

### 首页

![首页](docs/images/home.png)

### 排序算法可视化

![排序可视化](docs/images/sorting.png)

### 寻路算法可视化

![寻路可视化](docs/images/pathfinding.png)

### N 皇后回溯

![N皇后](docs/images/nqueens.png)

### 迷宫生成与求解

![迷宫](docs/images/maze.png)

### 二叉树遍历

![二叉树](docs/images/binarytree.png)

### 哈希表

![哈希表](docs/images/hashtable.png)

## 🧩 支持的算法

### 排序算法（6 种）

冒泡 · 选择 · 插入 · 快速 · 归并 · 堆排序

### 寻路算法（4 种）

BFS（广度优先） · DFS（深度优先） · Dijkstra · A*

### 回溯算法

N 皇后回溯 · 迷宫生成（DFS 递归回溯）+ BFS 求解

### 数据结构

二叉树遍历（前序/中序/后序/层序） · 链表操作（插入/删除/反转） · 哈希表（除留余数法 + 链地址法）

## 🚀 快速开始

```bash
npm install
npm run dev
```

打开 http://localhost:5174

> 纯前端项目，无需后端，可直接部署到 GitHub Pages / Vercel / Netlify。

## 📁 项目结构

```
algo-visualizer
└── src/
    ├── algorithms/
    │   ├── sorting.js        # 6 种排序算法（步骤生成）
    │   ├── pathfinding.js    # 4 种寻路算法 + 优先队列
    │   ├── backtracking.js   # N 皇后回溯
    │   ├── maze.js           # 迷宫生成 + 求解
    │   ├── tree.js           # 二叉树 + 遍历
    │   ├── linkedlist.js     # 链表操作
    │   └── hashtable.js      # 哈希表
    ├── components/           # 各算法可视化组件
    └── views/                # 页面（首页 + 7 个可视化页）
```

## 🔧 技术栈

- **框架**：Vue 3（组合式 API + `<script setup>`）
- **构建**：Vite 5
- **渲染**：Canvas 2D（`requestAnimationFrame` 动画）
- **路由**：Vue Router 4

## 📄 许可证

[MIT](LICENSE)

## 🤝 贡献

欢迎提交 Issue / PR。如果这个项目对你有帮助，请给一个 ⭐ Star！
