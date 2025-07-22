// Prism 初始化和自定义功能
document.addEventListener('DOMContentLoaded', function() {
  // 配置 autoloader
  if (typeof Prism !== 'undefined' && Prism.plugins.autoloader) {
    Prism.plugins.autoloader.languages_path = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/';
  }
  
  // 为所有代码块添加行号
  document.querySelectorAll('pre[class*="language-"]').forEach(function(pre) {
    if (!pre.classList.contains('line-numbers')) {
      pre.classList.add('line-numbers');
    }
  });
});

// 自定义工具栏按钮
if (typeof Prism !== 'undefined' && Prism.plugins.toolbar) {
  // 语言标签
  Prism.plugins.toolbar.registerButton('show-language', function(env) {
    var pre = env.element.parentNode;
    if (!pre || !env.language) return;
    var label = document.createElement('span');
    label.textContent = env.language.toUpperCase();
    label.className = 'prism-language-label';
    return label;
  });
  
  // 复制按钮的功能已由 prism-copy-to-clipboard.min.js 插件提供
  // 此处无需重复注册，相关的样式已在 prism-onedark.css 中定义
} 