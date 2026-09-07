<template>
  <div class="home">
    <NavBar />
    <div class="hero">
      <h1>算法与数据结构<span class="gradient">可视化</span></h1>
      <p class="subtitle">直观地观看排序、寻路算法如何一步步运行 —— 让抽象变得可见。</p>

      <div class="cards">
        <router-link to="/sorting" class="card">
          <div class="card-icon">📊</div>
          <h2>排序算法</h2>
          <p>柱状图动画演示 6 种经典排序算法</p>
          <div class="tags">
            <span>冒泡</span><span>选择</span><span>插入</span>
            <span>快排</span><span>归并</span><span>堆排序</span>
          </div>
          <div class="card-footer">开始体验 →</div>
        </router-link>

        <router-link to="/pathfinding" class="card">
          <div class="card-icon">🗺️</div>
          <h2>寻路算法</h2>
          <p>在网格上画墙，观看算法寻找最短路径</p>
          <div class="tags">
            <span>BFS</span><span>DFS</span>
            <span>Dijkstra</span><span>A*</span>
          </div>
          <div class="card-footer">开始体验 →</div>
        </router-link>

        <router-link to="/nqueens" class="card">
          <div class="card-icon">♛</div>
          <h2>N 皇后回溯</h2>
          <p>观察回溯算法如何试错、回退、找到解</p>
          <div class="tags"><span>回溯</span><span>递归</span></div>
          <div class="card-footer">开始体验 →</div>
        </router-link>

        <router-link to="/maze" class="card">
          <div class="card-icon">🧱</div>
          <h2>迷宫生成</h2>
          <p>递归回溯实时挖墙，再用 BFS 求解</p>
          <div class="tags"><span>DFS 生成</span><span>BFS 求解</span></div>
          <div class="card-footer">开始体验 →</div>
        </router-link>

        <router-link to="/binarytree" class="card">
          <div class="card-icon">🌳</div>
          <h2>二叉树遍历</h2>
          <p>随机生成 BST，观察四种遍历顺序</p>
          <div class="tags"><span>前序</span><span>中序</span><span>后序</span><span>层序</span></div>
          <div class="card-footer">开始体验 →</div>
        </router-link>

        <router-link to="/linkedlist" class="card">
          <div class="card-icon">🔗</div>
          <h2>链表操作</h2>
          <p>头插/尾插/删除，以及经典的三指针反转</p>
          <div class="tags"><span>插入</span><span>删除</span><span>反转</span></div>
          <div class="card-footer">开始体验 →</div>
        </router-link>

        <router-link to="/hashtable" class="card">
          <div class="card-icon">#️⃣</div>
          <h2>哈希表</h2>
          <p>除留余数法映射，链地址法解决冲突</p>
          <div class="tags"><span>哈希</span><span>冲突</span><span>链地址</span></div>
          <div class="card-footer">开始体验 →</div>
        </router-link>
      </div>

      <div class="features">
        <div class="feature">
          <span class="feature-icon">🎨</span>
          <h3>直观可视化</h3>
          <p>每一步操作实时高亮，一目了然</p>
        </div>
        <div class="feature">
          <span class="feature-icon">⚡</span>
          <h3>可调速动画</h3>
          <p>自由调节动画速度，观察细节</p>
        </div>
        <div class="feature">
          <span class="feature-icon">🎮</span>
          <h3>交互式操作</h3>
          <p>拖动起点终点、自由绘制障碍</p>
        </div>
      </div>

      <div class="author">
        <div class="author-avatar">📝</div>
        <div class="author-info">
          <h3>关于作者</h3>
          <p>
            <a href="https://blog.csdn.net/qq_41187124?type=blog" target="_blank" rel="noopener" class="author-name">知远漫谈</a>
            <span class="author-desc"> · 专注算法、数据结构与编程技术分享</span>
          </p>
          <a href="https://blog.csdn.net/qq_41187124?type=blog" target="_blank" rel="noopener" class="author-link">访问我的博客 ↗</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
</script>

<style scoped>
.home {
  min-height: 100%;
}
.hero {
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 24px;
  text-align: center;
}
.hero h1 {
  font-size: 44px;
  font-weight: 800;
  margin-bottom: 16px;
}
.gradient {
  background: linear-gradient(135deg, #6366f1, #22d3ee);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.subtitle {
  color: var(--text-muted);
  font-size: 18px;
  margin-bottom: 48px;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px 24px;
  text-decoration: none;
  color: var(--text);
  text-align: left;
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.card:hover {
  transform: translateY(-4px);
  border-color: var(--primary);
  box-shadow: 0 8px 30px rgba(99, 102, 241, 0.25);
}
.card-icon {
  font-size: 40px;
  margin-bottom: 12px;
}
.card h2 {
  font-size: 22px;
  margin-bottom: 8px;
}
.card p {
  color: var(--text-muted);
  font-size: 14px;
  margin-bottom: 16px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}
.tags span {
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
}
.card-footer {
  color: var(--accent);
  font-size: 14px;
  font-weight: 600;
}
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
.feature {
  text-align: left;
}
.feature-icon {
  font-size: 24px;
}
.feature h3 {
  font-size: 16px;
  margin: 8px 0 4px;
}
.feature p {
  color: var(--text-muted);
  font-size: 13px;
}
.author {
  margin-top: 48px;
  padding: 24px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  text-align: left;
}
.author-avatar {
  font-size: 40px;
  flex-shrink: 0;
}
.author-info h3 {
  font-size: 16px;
  margin-bottom: 6px;
  color: var(--accent);
}
.author-info p {
  color: var(--text-muted);
  font-size: 14px;
  margin-bottom: 8px;
}
.author-name {
  color: var(--text);
  font-weight: 600;
  text-decoration: none;
  font-size: 16px;
}
.author-name:hover {
  color: var(--accent);
}
.author-desc {
  color: var(--text-muted);
}
.author-link {
  display: inline-block;
  color: var(--accent);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
}
.author-link:hover {
  text-decoration: underline;
}
</style>
