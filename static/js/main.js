// Local-only version - Google Analytics removed

$(document).ready(function() {
  // 初始化tooltip
  $("[rel='tooltip']").tooltip();
  
  // 合并菜单切换功能
  $("#menu-close, #menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
  });
  
  // 平滑滚动功能
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

// 滚动触发动画（合并处理）
$(window).scroll(function() {
  $('.toSlideRight, .toSlideDown').each(function() {
    var $this = $(this);
    var itemPos = $this.offset().top;
    var topOfWindow = $(window).scrollTop();
    
    if (itemPos < topOfWindow + 600) {
      if ($this.hasClass('toSlideRight')) {
        $this.addClass('slideRight');
      }
      if ($this.hasClass('toSlideDown')) {
        $this.addClass('slideDown');
      }
    }
  });
});

// scrollDepth配置 (添加错误处理)
if (typeof jQuery.scrollDepth !== 'undefined') {
  try {
    jQuery.scrollDepth({
      elements: ['#portfolio', '#contact'],
      percentage: false,
      nonInteraction: false,
    });
  } catch (e) {
    console.warn('scrollDepth initialization failed:', e);
  }
}
