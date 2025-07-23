# MinipPro Hexo Theme

一个现代化、功能丰富的 Hexo 主题，支持暗色主题、统计分析、高度可定制化配置等特性。

## ✨ 特性

### 🎨 外观特性
- 🌙 **暗色/亮色主题切换** - 支持自动切换和手动切换
- 🎨 **可定制色彩方案** - 支持自定义主色调、辅助色等
- 📱 **完全响应式设计** - 适配各种设备屏幕
- ⚡ **流畅动画效果** - 可配置的过渡动画
- 🔤 **优雅字体系统** - 支持自定义字体配置

### 🚀 功能特性
- 🔍 **实时搜索** - 支持文章标题和内容搜索
- 📊 **访问统计** - 支持多种统计服务集成
- 🖼️ **图片灯箱** - 支持图片放大查看和画廊模式
- 📖 **文章目录** - 自动生成文章目录导航
- ⬆️ **回到顶部** - 平滑滚动回到页面顶部
- 📈 **阅读进度** - 显示文章阅读进度条
- 💬 **评论系统** - 支持多种评论系统集成
- 🏷️ **标签云** - 美观的标签展示页面
- 👥 **友情链接** - 友链展示页面

### ⚙️ 配置特性
- 🎛️ **可视化配置面板** - 在线调整主题设置
- 📥 **配置导入导出** - 备份和分享主题配置
- 🔧 **功能开关** - 灵活控制各项功能的启用状态
- 📊 **统计分析集成** - 支持 Google Analytics、百度统计等

## 🚀 快速开始

### 安装主题

1. 在你的 Hexo 博客根目录下执行：
```bash
git clone https://github.com/yourusername/hexo-theme-minipro.git themes/minipro
```

2. 修改站点配置文件 `_config.yml`：
```yaml
theme: minipro
```

3. 安装依赖：
```bash
npm install hexo-wordcount --save
```

### 基础配置

复制主题配置文件：
```bash
cp themes/minipro/_config.yml.example themes/minipro/_config.yml
```

## 📖 配置指南

### 基本信息配置

```yaml
# 网站基本信息
site:
  logo: "/images/logo.png"
  favicon: "/images/favicon.ico"
  keywords: "博客,技术,前端,开发"
  description: "一个专注于技术分享的个人博客"
```

### 外观配置

```yaml
# 主题外观配置
appearance:
  # 主题色彩配置
  colors:
    primary: "#667eea"      # 主色调
    secondary: "#f093fb"    # 辅助色
    accent: "#4299e1"       # 强调色
  
  # 字体配置
  fonts:
    main: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    code: '"JetBrains Mono", "Fira Code", "SF Mono", monospace'
    size: "16px"
  
  # 动画效果
  animations:
    enabled: true
    duration: "0.3s"
    easing: "ease-in-out"
```

### 功能配置

```yaml
# 功能开关
features:
  # 搜索功能
  search:
    enabled: true
    placeholder: "搜索文章..."
    max_results: 10
  
  # 回到顶部
  back_to_top:
    enabled: true
    threshold: 300
  
  # 阅读进度条
  reading_progress:
    enabled: true
    position: "top"  # top 或 bottom
  
  # 图片灯箱
  lightbox:
    enabled: true
    gallery: true
  
  # 代码复制
  code_copy:
    enabled: true
    success_text: "复制成功!"
  
  # 文章字数统计
  word_count:
    enabled: true
    reading_speed: 200
  
  # 文章目录
  toc:
    enabled: true
    max_depth: 3
    position: "right"  # left 或 right
```

### 统计分析配置

```yaml
# 统计分析配置
analytics:
  # Google Analytics
  google:
    enabled: true
    tracking_id: "G-XXXXXXXXXX"
  
  # 百度统计
  baidu:
    enabled: false
    site_id: "your_baidu_site_id"
  
  # 51LA 统计
  la51:
    enabled: false
    site_id: "your_51la_site_id"
  
  # 自定义统计代码
  custom:
    enabled: false
    head_code: ""  # 在 head 中插入的代码
    body_code: ""  # 在 body 结束前插入的代码
  
  # 访问统计显示
  visitor_stats:
    enabled: true
    show_pv: true    # 显示页面访问量
    show_uv: true    # 显示独立访客数
    api_url: ""      # 自定义统计 API 地址
```

### 社交媒体配置

```yaml
# 社交媒体配置
social:
  github: "yourusername"
  twitter: "yourusername"
  email: "your@email.com"
  qq: "123456789"
  wechat: "your_wechat_id"
```

### 评论系统配置

```yaml
# 评论系统配置
comments:
  # Gitalk
  gitalk:
    enabled: true
    client_id: "your_client_id"
    client_secret: "your_client_secret"
    repo: "your_repo"
    owner: "your_github_username"
    admin: ["your_github_username"]
  
  # Valine
  valine:
    enabled: false
    app_id: "your_leancloud_app_id"
    app_key: "your_leancloud_app_key"
    placeholder: "说点什么吧..."
    avatar: "mp"
    guest_info: ["nick", "mail", "link"]
  
  # Waline
  waline:
    enabled: false
    server_url: "https://your-waline-server.com"
    placeholder: "说点什么吧..."
```

### 导航菜单配置

```yaml
# 导航菜单配置
menu:
  home:
    name: "首页"
    url: "/"
    icon: "bi-house"
  archives:
    name: "归档"
    url: "/archives"
    icon: "bi-archive"
  tags:
    name: "标签"
    url: "/tags"
    icon: "bi-tags"
  about:
    name: "关于"
    url: "/about"
    icon: "bi-person"
  friends:
    name: "友链"
    url: "/friends"
    icon: "bi-people"
```

### 友情链接配置

```yaml
# 友情链接
friends:
  - name: "朋友的博客"
    link: "https://friend.example.com"
    avatar: "https://friend.example.com/avatar.jpg"
    descr: "朋友的博客描述"
  - name: "另一个朋友"
    link: "https://another.example.com"
    avatar: "https://another.example.com/avatar.jpg"
    descr: "另一个朋友的描述"
```

## 🎛️ 可视化配置

主题提供了可视化配置面板，你可以：

1. **实时调整外观** - 修改颜色、字体、动画等
2. **功能开关控制** - 启用或禁用各项功能
3. **配置导入导出** - 备份和分享配置
4. **一键重置** - 恢复默认设置

访问配置面板：点击页面右上角的齿轮图标 ⚙️

## 📊 统计分析

### 支持的统计服务

1. **Google Analytics** - 全球最流行的网站分析工具
2. **百度统计** - 适合中国用户的统计服务
3. **51LA** - 免费的网站统计服务
4. **自定义统计** - 支持插入自定义统计代码

### 访问统计显示

主题内置了访问统计显示功能：
- 站点总访问量 (PV)
- 独立访客数 (UV)
- 文章阅读量

数据存储在浏览器本地，也可以配置 API 上报到服务器。

## 🎨 自定义样式

### 自定义 CSS

创建 `source/css/custom.css` 文件：

```css
/* 自定义样式 */
:root {
  --primary: #your-color;
}

.custom-class {
  /* 你的样式 */
}
```

然后在主题配置中启用：

```yaml
custom_css: true
```

### 自定义 JavaScript

创建 `source/js/custom.js` 文件：

```javascript
// 自定义 JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // 你的代码
});
```

## 🔧 高级配置

### SEO 优化

```yaml
# SEO 优化配置
seo:
  # 结构化数据
  structured_data:
    enabled: true
    type: "Blog"
  
  # Open Graph
  open_graph:
    enabled: true
    image: "/images/og-image.png"
  
  # Twitter Card
  twitter_card:
    enabled: true
    type: "summary_large_image"
    site: "@yourusername"
```

### 页脚配置

```yaml
# 页脚配置
footer:
  copyright: "© 2024 Your Name. All rights reserved."
  powered_by: true    # 是否显示 "Powered by Hexo"
  theme_info: true    # 是否显示主题信息
  icp: ""            # ICP 备案号
  police: ""         # 公安备案号
```

## 📱 移动端优化

主题已经针对移动端进行了全面优化：

- 响应式布局设计
- 触摸友好的交互
- 移动端专用导航
- 优化的加载性能

## 🐛 问题排查

### 常见问题

1. **主题不生效**
   - 检查 `_config.yml` 中的 `theme` 配置
   - 确保主题文件夹名称正确

2. **统计不显示**
   - 检查统计配置是否正确
   - 确保统计 ID 填写正确

3. **搜索功能异常**
   - 确保安装了 `hexo-generator-search` 插件
   - 检查搜索配置是否启用

4. **样式异常**
   - 清除浏览器缓存
   - 执行 `hexo clean && hexo generate`

### 获取帮助

- 📖 [文档](https://your-docs-site.com)
- 🐛 [问题反馈](https://github.com/yourusername/hexo-theme-minipro/issues)
- 💬 [讨论区](https://github.com/yourusername/hexo-theme-minipro/discussions)

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 发起 Pull Request

## 📄 许可证

MIT License

## 🙏 致谢

感谢所有贡献者和使用者的支持！

---

> 如果这个主题对你有帮助，请给个 ⭐ Star 支持一下！