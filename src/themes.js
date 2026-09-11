/**
 * 主题配色方案
 * 每个主题定义一组 CSS 变量，通过设置 documentElement 的内联样式来切换
 */

export const themes = [
  {
    key: 'dark-blue',
    name: '深蓝',
    swatch: '#0f172a',
    colors: {
      '--bg': '#0f172a',
      '--bg-card': '#1e293b',
      '--bg-hover': '#334155',
      '--text': '#e2e8f0',
      '--text-muted': '#94a3b8',
      '--primary': '#6366f1',
      '--primary-hover': '#818cf8',
      '--accent': '#22d3ee',
      '--border': '#334155'
    }
  },
  {
    key: 'dark',
    name: '暗黑',
    swatch: '#111111',
    colors: {
      '--bg': '#111111',
      '--bg-card': '#1c1c1e',
      '--bg-hover': '#2c2c2e',
      '--text': '#e5e5e5',
      '--text-muted': '#8e8e93',
      '--primary': '#4f8cff',
      '--primary-hover': '#6ba1ff',
      '--accent': '#34d399',
      '--border': '#2c2c2e'
    }
  },
  {
    key: 'purple',
    name: '紫色',
    swatch: '#1a1033',
    colors: {
      '--bg': '#1a1033',
      '--bg-card': '#2a1b4d',
      '--bg-hover': '#3b2a66',
      '--text': '#ede9fe',
      '--text-muted': '#a78bfa',
      '--primary': '#8b5cf6',
      '--primary-hover': '#a78bfa',
      '--accent': '#f472b6',
      '--border': '#3b2a66'
    }
  },
  {
    key: 'light',
    name: '浅色',
    swatch: '#f5f6f8',
    colors: {
      '--bg': '#f5f6f8',
      '--bg-card': '#ffffff',
      '--bg-hover': '#e8eaed',
      '--text': '#1f2937',
      '--text-muted': '#6b7280',
      '--primary': '#4f46e5',
      '--primary-hover': '#6366f1',
      '--accent': '#0891b2',
      '--border': '#e5e7eb'
    }
  }
]

const STORAGE_KEY = 'algo-visualizer-theme'

/** 应用主题：把主题颜色写入 documentElement 内联样式 */
export function applyTheme(themeKey) {
  const theme = themes.find((t) => t.key === themeKey) || themes[0]
  const root = document.documentElement
  for (const [varName, value] of Object.entries(theme.colors)) {
    root.style.setProperty(varName, value)
  }
  return theme
}

/** 读取保存的主题（默认深蓝） */
export function loadTheme() {
  return localStorage.getItem(STORAGE_KEY) || 'dark-blue'
}

/** 保存主题 */
export function saveTheme(themeKey) {
  localStorage.setItem(STORAGE_KEY, themeKey)
}
