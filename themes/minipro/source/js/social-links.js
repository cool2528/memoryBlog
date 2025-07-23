/**
 * 社交媒体链接功能
 */
document.addEventListener('DOMContentLoaded', function() {
  // 处理微信二维码显示
  const wechatLinks = document.querySelectorAll('.wechat-link');
  
  if (wechatLinks.length > 0) {
    // 创建二维码弹窗
    const qrcodeContainer = document.createElement('div');
    qrcodeContainer.className = 'wechat-qrcode';
    qrcodeContainer.innerHTML = `
      <span class="wechat-qrcode-close">&times;</span>
      <div id="wechat-qrcode-content"></div>
      <p style="text-align: center; margin-top: 0.5rem;">扫码添加微信</p>
    `;
    document.body.appendChild(qrcodeContainer);
    
    const closeBtn = qrcodeContainer.querySelector('.wechat-qrcode-close');
    const qrcodeContent = document.getElementById('wechat-qrcode-content');
    
    // 点击关闭按钮
    closeBtn.addEventListener('click', function() {
      qrcodeContainer.style.display = 'none';
    });
    
    // 点击微信图标
    wechatLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const wechatId = this.getAttribute('data-wechat');
        if (!wechatId) return;
        
        // 生成二维码
        qrcodeContent.innerHTML = '';
        
        // 使用在线服务生成二维码
        const qrcodeImg = document.createElement('img');
        qrcodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(wechatId)}`;
        qrcodeImg.alt = '微信二维码';
        qrcodeContent.appendChild(qrcodeImg);
        
        // 显示弹窗
        qrcodeContainer.style.display = 'block';
      });
    });
    
    // 点击其他区域关闭弹窗
    document.addEventListener('click', function(e) {
      if (qrcodeContainer.style.display === 'block' && 
          !qrcodeContainer.contains(e.target) && 
          !Array.from(wechatLinks).some(link => link.contains(e.target))) {
        qrcodeContainer.style.display = 'none';
      }
    });
  }
});