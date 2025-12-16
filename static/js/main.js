// Local-only version - Google Analytics removed
// Optimized: Converted to native JavaScript, removed jQuery dependency

// 移除了JavaScript事件监听器，避免与HTML中的内联onclick事件处理程序冲突
// 菜单切换功能已在HTML中通过内联onclick事件实现
  
// 平滑滚动功能
const initSmoothScroll = () => {
  document.querySelectorAll('a[href*="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') || 
          location.hostname === this.hostname) {
        
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
          e.preventDefault();
          
          const topOffset = target.offsetTop;
          const duration = 1000;
          const startPosition = window.pageYOffset;
          const distance = topOffset - startPosition;
          let startTime = null;
          
          function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const easeInOutQuad = timeElapsed < duration / 2
              ? 2 * timeElapsed * timeElapsed / (duration * duration)
              : -1 + (4 - 2 * timeElapsed / duration) * timeElapsed / duration;
            
            window.scrollTo(0, startPosition + distance * easeInOutQuad);
            
            if (timeElapsed < duration) {
              requestAnimationFrame(animation);
            }
          }
          
          requestAnimationFrame(animation);
        }
      }
    });
  });
};

// 初始化平滑滚动
initSmoothScroll();

// 滚动触发动画（仅保留使用的slideRight效果）
window.addEventListener('scroll', function() {
  document.querySelectorAll('.toSlideRight').forEach(element => {
    const itemPos = element.getBoundingClientRect().top + window.pageYOffset;
    const topOfWindow = window.pageYOffset;
    
    if (itemPos < topOfWindow + 600) {
      element.classList.add('slideRight');
    }
  });
});