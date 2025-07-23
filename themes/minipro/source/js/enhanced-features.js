// 增强功能 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 回到顶部按钮
    function initBackToTop() {
        // 创建回到顶部按钮
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
        backToTopBtn.setAttribute('aria-label', '回到顶部');
        document.body.appendChild(backToTopBtn);
        
        // 监听滚动事件
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // 点击回到顶部
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 2. 阅读进度条
    function initReadingProgress() {
        // 只在文章页面显示
        if (!document.querySelector('.post-detail')) return;
        
        // 创建进度条
        const progressContainer = document.createElement('div');
        progressContainer.className = 'reading-progress';
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress-bar';
        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);
        
        // 计算阅读进度
        window.addEventListener('scroll', function() {
            const article = document.querySelector('.post-content');
            if (!article) return;
            
            const articleTop = article.offsetTop;
            const articleHeight = article.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.pageYOffset;
            
            const progress = Math.min(
                Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0),
                1
            );
            
            progressBar.style.width = (progress * 100) + '%';
        });
    }
    
    // 3. 搜索功能 - 移到顶部导航栏
    function initSearch() {
        // 创建搜索容器
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div style="position: relative;">
                <input type="text" class="search-input" placeholder="搜索文章..." id="searchInput">
                <i class="bi bi-search" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none;"></i>
            </div>
            <div id="searchResults" class="search-results" style="display: none;"></div>
        `;
        
        // 插入到header的导航栏中，确保不会遮挡主题切换按钮
        const headerContainer = document.querySelector('.site-header .container');
        if (headerContainer) {
            // 查找或创建右侧控制区域
            let rightControls = document.querySelector('.header-right-controls');
            if (!rightControls) {
                rightControls = document.createElement('div');
                rightControls.className = 'header-right-controls';
                headerContainer.appendChild(rightControls);
            }
            rightControls.appendChild(searchContainer);
        }
        
        // 搜索功能（简单的客户端搜索）
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const query = this.value.toLowerCase().trim();
                
                if (query.length < 2) {
                    searchResults.style.display = 'none';
                    return;
                }
                
                // 搜索文章标题
                const articles = document.querySelectorAll('.post-card');
                const results = [];
                
                articles.forEach(article => {
                    const title = article.querySelector('.post-title');
                    const excerpt = article.querySelector('.post-excerpt');
                    
                    if (title && (
                        title.textContent.toLowerCase().includes(query) ||
                        (excerpt && excerpt.textContent.toLowerCase().includes(query))
                    )) {
                        results.push({
                            title: title.textContent,
                            url: title.href || title.closest('a')?.href || '#',
                            excerpt: excerpt ? excerpt.textContent.substring(0, 100) + '...' : ''
                        });
                    }
                });
                
                // 显示搜索结果
                if (results.length > 0) {
                    searchResults.innerHTML = results.map(result => `
                        <div class="search-result-item">
                            <a href="${result.url}" class="search-result-title">${result.title}</a>
                            <p class="search-result-excerpt">${result.excerpt}</p>
                        </div>
                    `).join('');
                    searchResults.style.display = 'block';
                } else {
                    searchResults.innerHTML = '<div class="search-no-results">未找到相关文章</div>';
                    searchResults.style.display = 'block';
                }
            });
            
            // 点击外部关闭搜索结果
            document.addEventListener('click', function(e) {
                if (!searchContainer.contains(e.target)) {
                    searchResults.style.display = 'none';
                }
            });
        }
    }
    
    // 4. 图片懒加载
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // 降级方案
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }
    
    // 5. 平滑滚动锚点
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // 6. 文章目录生成
    function initTableOfContents() {
        const article = document.querySelector('.post-content');
        if (!article) return;
        
        const headings = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (headings.length < 3) return; // 少于3个标题不生成目录
        
        // 创建目录容器
        const tocContainer = document.createElement('div');
        tocContainer.className = 'table-of-contents';
        tocContainer.innerHTML = '<h4>文章目录</h4><ul class="toc-list"></ul>';
        
        const tocList = tocContainer.querySelector('.toc-list');
        
        // 生成目录项
        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;
            
            const li = document.createElement('li');
            li.className = `toc-item toc-${heading.tagName.toLowerCase()}`;
            li.innerHTML = `<a href="#${id}" class="toc-link">${heading.textContent}</a>`;
            tocList.appendChild(li);
        });
        
        // 插入目录到文章开头
        article.insertBefore(tocContainer, article.firstChild);
        
        // 目录项点击事件
        tocContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('toc-link')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
    
    // 7. 代码复制功能增强
    function enhanceCodeBlocks() {
        document.querySelectorAll('pre[class*="language-"]').forEach(pre => {
            // 添加语言标签
            const code = pre.querySelector('code');
            if (code) {
                const language = [...pre.classList]
                    .find(cls => cls.startsWith('language-'))
                    ?.replace('language-', '') || 'text';
                
                const langLabel = document.createElement('div');
                langLabel.className = 'code-language-label';
                langLabel.textContent = language.toUpperCase();
                pre.appendChild(langLabel);
            }
        });
    }
    
    // 8. 主题切换功能
    function initThemeToggle() {
        // 创建主题切换按钮
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
        themeToggle.setAttribute('aria-label', '切换主题');
        themeToggle.title = '切换暗色/亮色主题';
        
        // 添加到header容器的右侧控制区域，与搜索框一起
        let rightControls = document.querySelector('.header-right-controls');
        if (!rightControls) {
            // 如果右侧控制区域不存在，创建一个
            const headerContainer = document.querySelector('.site-header .container');
            if (headerContainer) {
                rightControls = document.createElement('div');
                rightControls.className = 'header-right-controls';
                headerContainer.appendChild(rightControls);
            }
        }
        if (rightControls) {
            rightControls.appendChild(themeToggle);
        }
        
        // 检查本地存储的主题设置并同步到body和html
        const currentTheme = localStorage.getItem('theme') || 'light';
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            document.documentElement.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
        } else {
            document.body.classList.remove('dark-theme');
            document.documentElement.classList.remove('dark-theme');
        }
        
        // 主题切换事件
        themeToggle.addEventListener('click', function() {
            const isDark = !document.body.classList.contains('dark-theme');
            
            if (isDark) {
                document.body.classList.add('dark-theme');
                document.documentElement.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
                document.documentElement.classList.remove('dark-theme');
            }
            
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeToggle.innerHTML = isDark ? 
                '<i class="bi bi-sun-fill"></i>' : 
                '<i class="bi bi-moon-fill"></i>';
        });
    }
    
    // 初始化所有功能 - 先创建右侧控制区域，然后按顺序添加元素
    initBackToTop();
    initReadingProgress();
    
    // 先确保右侧控制区域存在
    const headerContainer = document.querySelector('.site-header .container');
    if (headerContainer) {
        let rightControls = document.querySelector('.header-right-controls');
        if (!rightControls) {
            rightControls = document.createElement('div');
            rightControls.className = 'header-right-controls';
            rightControls.style.cssText = 'display: flex !important; align-items: center; gap: 1rem; margin-left: auto; z-index: 50;';
            headerContainer.appendChild(rightControls);
        }
    }
    
    // 先初始化搜索功能
    initSearch();
    // 然后初始化主题切换按钮
    initThemeToggle();
    // 初始化其他功能
    initLazyLoading();
    initSmoothScrolling();
    initTableOfContents();
    enhanceCodeBlocks();
    
    // 移除加载状态，显示页面内容
    document.body.classList.remove('theme-loading');
    document.body.classList.add('theme-loaded');
    
    // 添加加载完成的类名，用于CSS动画
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});