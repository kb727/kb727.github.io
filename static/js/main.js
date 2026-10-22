/*
* Main JavaScript file containing all site functionality
* Optimized for performance and minimal dependencies
*/

/*
* Smooth Scroll Function
* Uses requestAnimationFrame for better performance
* Implements easeInOutQuad animation
*/
function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

/*
* Slide Right Animation
* Triggered on scroll for elements with 'toSlideRight' class
* Throttled via requestAnimationFrame for smooth performance
*/
function slideRight() {
    const elements = document.querySelectorAll('.slideRight, .toSlideRight');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (elementPosition < screenPosition - 150) {
            element.classList.add('slideRight');
        }
    });
}

/*
* Toggle Menu Function
* Handles sidebar menu visibility
*/
function toggleMenu(event) {
    if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
    }
    const sidebar = document.getElementById('sidebar-wrapper');
    const menuToggle = document.getElementById('menu-toggle');
    if (sidebar) {
        if (sidebar.classList.contains('active')) {
            sidebar.style.right = '-250px';
            sidebar.classList.remove('active');
            if (menuToggle) {
                menuToggle.style.visibility = 'visible';
            }
        } else {
            sidebar.style.right = '0px';
            sidebar.classList.add('active');
            /* Hide the red toggle so the open menu cover stays fully #669900 */
            if (menuToggle) {
                menuToggle.style.visibility = 'hidden';
            }
        }
    }
}

/*
* Card Click Handler with Accessibility
* Handles click and keyboard events for cards with data-href attribute
*/
function setupCardClickHandlers() {
    // Event delegation for click events
    document.addEventListener('click', function(e) {
        let target = e.target;
        while (target && !target.classList.contains('xe-widget') && !target.hasAttribute('data-href')) {
            target = target.parentElement;
        }

        if (target) {
            const href = target.getAttribute('data-href');
            if (href) {
                // Check if the card should open in new tab (for xe-widget)
                if (target.classList.contains('xe-widget')) {
                    window.open(href, '_blank', 'noopener,noreferrer');
                } else {
                    window.location.href = href;
                }
            }
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        let target = e.target;
        while (target && !target.classList.contains('xe-widget') && !target.hasAttribute('data-href')) {
            target = target.parentElement;
        }

        if (target && (e.which === 13 || e.which === 32)) {
            const href = target.getAttribute('data-href');
            if (href) {
                e.preventDefault();
                // Check if the card should open in new tab (for xe-widget)
                if (target.classList.contains('xe-widget')) {
                    window.open(href, '_blank', 'noopener,noreferrer');
                } else {
                    window.location.href = href;
                }
            }
        }
    });

    // Add accessibility attributes to clickable cards
    const widgets = document.querySelectorAll('.xe-widget[data-href]');
    widgets.forEach(function(widget) {
        const title = widget.getAttribute('data-original-title') || widget.getAttribute('title') || 'Open link';
        widget.setAttribute('role', 'button');
        widget.setAttribute('tabindex', '0');
        widget.setAttribute('aria-label', title);
    });
}

/*
* Mobile Menu Handler
* Handles menu toggle on mobile devices
*/
function setupMobileMenuHandler() {
    // Handle default mobile menu button
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            const menu = document.querySelector('.mobile-menu');
            if (menu) {
                menu.classList.toggle('show');
            }
        });
    }

    // Handle specific mobile menu toggle in index.html
    const mobileToggleBtn = document.querySelector(".mobile-menu-toggle a[data-toggle='mobile-menu']");
    if (mobileToggleBtn) {
        mobileToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const mainMenu = document.querySelector(".main-menu");
            if (mainMenu) {
                mainMenu.classList.toggle("mobile-is-visible");
            }
        });
    }
}

/*
* Add accessibility attributes to elements
*/
function addAccessibilityAttributes() {
    // Add ARIA attributes for better accessibility
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-controls', 'sidebar-wrapper');
        menuToggle.setAttribute('role', 'button');
    }

    const sidebar = document.getElementById('sidebar-wrapper');
    if (sidebar) {
        sidebar.setAttribute('role', 'navigation');
    }
}

/*
* Initialize all site functionality
*/
function init() {
    // Mark page as loaded
    document.documentElement.classList.add('loaded');

    // Throttled scroll listener using requestAnimationFrame
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                slideRight();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initialize components
    setupCardClickHandlers();
    addAccessibilityAttributes();
    setupMobileMenuHandler();

    // Trigger slideRight on page load to handle elements already in view
    slideRight();
}

// Initialize site functionality when DOM is ready
document.addEventListener('DOMContentLoaded', init);

/*
* Social media share functions - fallback for attachment pages without
* inline copies. default.html and legacy attachment pages define their own
* inline versions which load after main.js and take precedence.
*/
function ensureWeChatModal() {
    var modal = document.getElementById('wechatModal');
    if (modal) {
        return modal;
    }
    if (!document.getElementById('wechatModalStyle')) {
        var style = document.createElement('style');
        style.id = 'wechatModalStyle';
        style.textContent =
            '.wechat-modal{display:none;position:fixed;z-index:10000;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,0.6);align-items:center;justify-content:center;animation:fadeIn 0.3s ease-in-out;}' +
            '.wechat-modal-content{background-color:#fff;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.15);max-width:400px;width:90%;position:relative;animation:slideIn 0.3s ease-in-out;}' +
            '.wechat-modal-close{position:absolute;right:15px;top:15px;color:#999;font-size:28px;font-weight:bold;cursor:pointer;transition:color 0.2s;line-height:1;}' +
            '.wechat-modal-close:hover{color:#333;}' +
            '.wechat-modal-header{padding:20px 20px 10px;text-align:center;border-bottom:1px solid #eee;}' +
            '.wechat-modal-header h3{margin:0;color:#333;font-size:20px;font-weight:600;}' +
            '.wechat-modal-body{padding:25px 20px;text-align:center;}' +
            '.wechat-modal-body p{margin:0 0 15px;color:#666;font-size:15px;}' +
            '.qr-code-container{display:flex;justify-content:center;align-items:center;margin:20px 0;padding:15px;background-color:#f8f8f8;border-radius:8px;}' +
            '.qr-code-container img{max-width:200px;height:auto;display:block;}' +
            '.qr-url{font-size:12px;color:#999;word-break:break-all;margin-top:10px !important;}' +
            '@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}' +
            '@keyframes slideIn{from{transform:translateY(-50px);opacity:0;}to{transform:translateY(0);opacity:1;}}' +
            '@media (max-width:480px){.wechat-modal-content{width:95%;}.qr-code-container img{max-width:180px;}}';
        document.head.appendChild(style);
    }
    modal = document.createElement('div');
    modal.id = 'wechatModal';
    modal.className = 'wechat-modal';
    modal.style.display = 'none';
    modal.innerHTML = '<div class="wechat-modal-content">' +
        '<span class="wechat-modal-close" onclick="closeWeChatModal()">&times;</span>' +
        '<div class="wechat-modal-header"><h3>微信分享</h3></div>' +
        '<div class="wechat-modal-body"><p>请使用微信扫描二维码</p>' +
        '<div class="qr-code-container"><img id="wechatQRCode" src="" alt="微信分享二维码" /></div>' +
        '<p class="qr-url" id="qrUrl"></p></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeWeChatModal();
        }
    });
    return modal;
}

function shareToWeChat() {
    var fixedUrl = 'https://kb727.com';
    var modal = ensureWeChatModal();
    var qrCode = document.getElementById('wechatQRCode');
    var qrUrl = document.getElementById('qrUrl');
    qrCode.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(fixedUrl);
    qrUrl.textContent = fixedUrl;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeWeChatModal() {
    var modal = document.getElementById('wechatModal');
    if (modal) {
        modal.style.display = 'none';
    }
    document.body.style.overflow = 'auto';
}

function copyToClipboard(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('复制失败:', err);
    }
    document.body.removeChild(textarea);
}

function shareToDouyin() {
    var currentUrl = window.location.href;
    var currentTitle = document.title;
    if (navigator.share) {
        navigator.share({
            title: currentTitle,
            url: currentUrl
        }).then(function() {
            console.log('分享成功');
        }).catch(function() {
            copyToClipboard(currentUrl);
            alert('链接已复制到剪贴板，可以粘贴到抖音分享');
        });
    } else {
        copyToClipboard(currentUrl);
        alert('链接已复制到剪贴板，可以粘贴到抖音分享');
    }
}

function shareToXiaohongshu() {
    var currentUrl = window.location.href;
    var currentTitle = document.title;
    if (navigator.share) {
        navigator.share({
            title: currentTitle,
            url: currentUrl
        }).then(function() {
            console.log('分享成功');
        }).catch(function() {
            copyToClipboard(currentUrl);
            alert('链接已复制到剪贴板，可以粘贴到小红书分享');
        });
    } else {
        copyToClipboard(currentUrl);
        alert('链接已复制到剪贴板，可以粘贴到小红书分享');
    }
}

window.shareToWeChat = shareToWeChat;
window.closeWeChatModal = closeWeChatModal;
window.shareToDouyin = shareToDouyin;
window.shareToXiaohongshu = shareToXiaohongshu;

// Expose functions globally for inline event handlers
window.smoothScroll = smoothScroll;
window.toggleMenu = toggleMenu;
