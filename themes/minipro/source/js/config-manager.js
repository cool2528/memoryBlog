// 主题配置管理器
class ThemeConfigManager {
  constructor() {
    this.config = this.loadConfig();
    this.init();
  }

  // 加载配置
  loadConfig() {
    // 从页面中获取主题配置
    const configElement = document.getElementById('theme-config');
    if (configElement) {
      try {
        return JSON.parse(configElement.textContent);
      } catch (e) {
        console.warn('主题配置解析失败:', e);
      }
    }
    
    // 默认配置
    return {
      features: {
        search: { enabled: true },
        back_to_top: { enabled: true, threshold: 300 },
        reading_progress: { enabled: true, position: 'top' },
        lightbox: { enabled: true, gallery: true },
        code_copy: { enabled: true },
        word_count: { enabled: true },
        toc: { enabled: true, max_depth: 3, position: 'right' }
      },
      appearance: {
        animations: { enabled: true, duration: '0.3s' },
        colors: {
          primary: '#667eea',
          secondary: '#f093fb',
          accent: '#4299e1'
        }
      },
      analytics: {
        visitor_stats: { enabled: true }
      }
    };
  }

  // 初始化配置
  init() {
    this.applyColorScheme();
    this.applyAnimationSettings();
    this.initFeatures();
  }

  // 应用颜色方案
  applyColorScheme() {
    const colors = this.config.appearance?.colors;
    if (colors) {
      const root = document.documentElement;
      if (colors.primary) root.style.setProperty('--primary', colors.primary);
      if (colors.secondary) root.style.setProperty('--secondary', colors.secondary);
      if (colors.accent) root.style.setProperty('--accent', colors.accent);
    }
  }

  // 应用动画设置
  applyAnimationSettings() {
    const animations = this.config.appearance?.animations;
    if (animations) {
      const root = document.documentElement;
      
      if (animations.enabled === false) {
        root.style.setProperty('--transition-fast', 'none');
        root.style.setProperty('--transition-normal', 'none');
        root.style.setProperty('--transition-slow', 'none');
      } else if (animations.duration) {
        root.style.setProperty('--transition-normal', `${animations.duration} ${animations.easing || 'ease-in-out'}`);
      }
    }
  }

  // 初始化功能
  initFeatures() {
    const features = this.config.features || {};
    
    // 根据配置启用/禁用功能
    Object.keys(features).forEach(feature => {
      const featureConfig = features[feature];
      if (featureConfig && featureConfig.enabled === false) {
        this.disableFeature(feature);
      }
    });
  }

  // 禁用功能
  disableFeature(feature) {
    switch (feature) {
      case 'search':
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) searchContainer.style.display = 'none';
        break;
        
      case 'back_to_top':
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) backToTop.style.display = 'none';
        break;
        
      case 'reading_progress':
        const progressBar = document.querySelector('.reading-progress');
        if (progressBar) progressBar.style.display = 'none';
        break;
        
      case 'toc':
        const toc = document.querySelector('.toc-container');
        if (toc) toc.style.display = 'none';
        break;
    }
  }

  // 获取配置值
  get(path) {
    return this.getNestedValue(this.config, path);
  }

  // 设置配置值
  set(path, value) {
    this.setNestedValue(this.config, path, value);
    this.saveConfig();
  }

  // 获取嵌套值
  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current && current[key], obj);
  }

  // 设置嵌套值
  setNestedValue(obj, path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
      if (!current[key]) current[key] = {};
      return current[key];
    }, obj);
    target[lastKey] = value;
  }

  // 保存配置到本地存储
  saveConfig() {
    try {
      localStorage.setItem('theme-config', JSON.stringify(this.config));
    } catch (e) {
      console.warn('配置保存失败:', e);
    }
  }

  // 重置配置
  reset() {
    // 移除主题配置
    localStorage.removeItem('theme-config');
    
    // 重置暗色/亮色主题设置为默认的亮色主题
    localStorage.setItem('theme', 'light');
    
    // 应用亮色主题
    document.body.classList.remove('dark-theme');
    document.documentElement.classList.remove('dark-theme');
    
    // 更新主题切换按钮
    const themeToggleButtons = document.querySelectorAll('.theme-toggle');
    themeToggleButtons.forEach(btn => {
      btn.innerHTML = '<i class="bi bi-moon-fill"></i>';
    });
    
    // 更新配置面板中的暗色模式开关
    const darkModeToggle = document.querySelector('#enable-dark-mode');
    if (darkModeToggle) {
      darkModeToggle.checked = false;
    }
    
    // 重新加载页面以应用所有重置的设置
    location.reload();
  }

  // 导出配置
  export() {
    const dataStr = JSON.stringify(this.config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'theme-config.json';
    link.click();
    
    URL.revokeObjectURL(url);
  }

  // 导入配置
  import(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target.result);
          this.config = { ...this.config, ...config };
          this.saveConfig();
          this.init();
          resolve(config);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }
}

// 全局配置管理器实例
window.themeConfig = new ThemeConfigManager();

// 配置面板功能
class ConfigPanel {
  constructor() {
    this.isOpen = false;
    // 不创建配置面板
    // this.createPanel();
    // this.bindEvents();
  }

  createPanel() {
    const panel = document.createElement('div');
    panel.className = 'config-panel';
    panel.innerHTML = `
      <div class="config-panel-header">
        <h3>主题设置</h3>
        <button class="config-panel-close">&times;</button>
      </div>
      <div class="config-panel-content">
        <div class="config-section">
          <h4>外观设置</h4>
          <div class="config-item">
            <label>暗色模式</label>
            <input type="checkbox" id="enable-dark-mode" ${localStorage.getItem('theme') === 'dark' ? 'checked' : ''}>
          </div>
          <div class="config-item">
            <label>主色调</label>
            <input type="color" id="primary-color" value="${window.themeConfig.get('appearance.colors.primary') || '#667eea'}">
          </div>
          <div class="config-item">
            <label>启用动画</label>
            <input type="checkbox" id="enable-animations" ${window.themeConfig.get('appearance.animations.enabled') !== false ? 'checked' : ''}>
          </div>
        </div>
        
        <div class="config-section">
          <h4>功能设置</h4>
          <div class="config-item">
            <label>搜索功能</label>
            <input type="checkbox" id="enable-search" ${window.themeConfig.get('features.search.enabled') !== false ? 'checked' : ''}>
          </div>
          <div class="config-item">
            <label>回到顶部</label>
            <input type="checkbox" id="enable-back-to-top" ${window.themeConfig.get('features.back_to_top.enabled') !== false ? 'checked' : ''}>
          </div>
          <div class="config-item">
            <label>阅读进度</label>
            <input type="checkbox" id="enable-reading-progress" ${window.themeConfig.get('features.reading_progress.enabled') !== false ? 'checked' : ''}>
          </div>
        </div>
        
        <div class="config-section">
          <h4>配置管理</h4>
          <div class="config-actions">
            <button id="export-config">导出配置</button>
            <button id="import-config">导入配置</button>
            <button id="reset-config">重置配置</button>
          </div>
          <input type="file" id="config-file-input" accept=".json" style="display: none;">
        </div>
      </div>
    `;
    
    document.body.appendChild(panel);
    this.panel = panel;
  }

  bindEvents() {
    // 关闭面板
    this.panel.querySelector('.config-panel-close').addEventListener('click', () => {
      this.close();
    });

    // 颜色设置
    this.panel.querySelector('#primary-color').addEventListener('change', (e) => {
      window.themeConfig.set('appearance.colors.primary', e.target.value);
      window.themeConfig.applyColorScheme();
    });

    // 暗色模式切换
    const darkModeToggle = this.panel.querySelector('#enable-dark-mode');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('change', (e) => {
        const isDark = e.target.checked;
        // 保存到localStorage
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // 应用暗色主题
        if (isDark) {
          document.body.classList.add('dark-theme');
          document.documentElement.classList.add('dark-theme');
          
          // 更新主题切换按钮
          const themeToggleButtons = document.querySelectorAll('.theme-toggle');
          themeToggleButtons.forEach(btn => {
            btn.innerHTML = '<i class="bi bi-sun-fill"></i>';
          });
        } else {
          document.body.classList.remove('dark-theme');
          document.documentElement.classList.remove('dark-theme');
          
          // 更新主题切换按钮
          const themeToggleButtons = document.querySelectorAll('.theme-toggle');
          themeToggleButtons.forEach(btn => {
            btn.innerHTML = '<i class="bi bi-moon-fill"></i>';
          });
        }
      });
    }
    
    // 功能开关
    ['enable-animations', 'enable-search', 'enable-back-to-top', 'enable-reading-progress'].forEach(id => {
      const element = this.panel.querySelector(`#${id}`);
      if (element) {
        element.addEventListener('change', (e) => {
          const path = this.getConfigPath(id);
          window.themeConfig.set(path, e.target.checked);
          if (id === 'enable-animations') {
            window.themeConfig.applyAnimationSettings();
          }
        });
      }
    });

    // 配置管理
    this.panel.querySelector('#export-config').addEventListener('click', () => {
      window.themeConfig.export();
    });

    this.panel.querySelector('#import-config').addEventListener('click', () => {
      this.panel.querySelector('#config-file-input').click();
    });

    this.panel.querySelector('#config-file-input').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        window.themeConfig.import(file).then(() => {
          alert('配置导入成功！');
          location.reload();
        }).catch(() => {
          alert('配置导入失败！');
        });
      }
    });

    this.panel.querySelector('#reset-config').addEventListener('click', () => {
      if (confirm('确定要重置所有配置吗？')) {
        window.themeConfig.reset();
      }
    });
  }

  getConfigPath(id) {
    const pathMap = {
      'enable-animations': 'appearance.animations.enabled',
      'enable-search': 'features.search.enabled',
      'enable-back-to-top': 'features.back_to_top.enabled',
      'enable-reading-progress': 'features.reading_progress.enabled'
    };
    return pathMap[id];
  }

  open() {
    this.panel.classList.add('open');
    this.isOpen = true;
  }

  close() {
    this.panel.classList.remove('open');
    this.isOpen = false;
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}

// 初始化配置面板
document.addEventListener('DOMContentLoaded', () => {
  window.configPanel = new ConfigPanel();
  
  // 隐藏配置按钮功能
  // 仍然检查或创建右侧控制区域，以便其他功能可以使用
  let rightControls = document.querySelector('.header-right-controls');
  
  // 如果右侧控制区域不存在，创建一个
  if (!rightControls) {
    const header = document.querySelector('.site-header .container');
    if (header) {
      rightControls = document.createElement('div');
      rightControls.className = 'header-right-controls';
      rightControls.style.display = 'flex';
      rightControls.style.alignItems = 'center';
      rightControls.style.marginLeft = 'auto';
      header.appendChild(rightControls);
    }
  }
  
  // 配置按钮已被隐藏
  // 如果将来需要恢复，取消下面的注释即可
  /*
  if (rightControls) {
    const configBtn = document.createElement('button');
    configBtn.className = 'config-toggle-btn';
    configBtn.innerHTML = '<i class="bi bi-gear"></i>';
    configBtn.title = '主题设置';
    configBtn.addEventListener('click', () => {
      window.configPanel.toggle();
    });
    rightControls.appendChild(configBtn);
  }
  */
});