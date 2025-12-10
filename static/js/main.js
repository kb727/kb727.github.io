// Local-only version - Native JavaScript implementation
// Replaces jQuery and Bootstrap JavaScript dependencies
// Optimized for minimal DOM operations

// Document ready function
function ready(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

// DOM element cache to avoid repeated queries
const DOM = {
    tooltipElements: null,
    slideRightElements: null,
    slideDownElements: null,
    scrollDepthElements: null,
    menuClose: null,
    menuToggle: null,
    sidebarWrapper: null,
    smoothScrollLinks: null
};

// Cache DOM elements
function cacheDOM() {
    DOM.tooltipElements = document.querySelectorAll('[rel="tooltip"]');
    DOM.slideRightElements = document.querySelectorAll('.toSlideRight');
    DOM.slideDownElements = document.querySelectorAll('.toSlideDown');
    DOM.scrollDepthElements = {
        portfolio: document.querySelector('#portfolio'),
        contact: document.querySelector('#contact')
    };
    DOM.menuClose = document.getElementById('menu-close');
    DOM.menuToggle = document.getElementById('menu-toggle');
    DOM.sidebarWrapper = document.getElementById('sidebar-wrapper');
    DOM.smoothScrollLinks = document.querySelectorAll('a[href*="#"]:not([href="#"])');
}

// Simple tooltip implementation with caching
function initTooltips() {
    // Create a single shared tooltip element
    let tooltip = document.createElement('div');
    tooltip.className = 'tooltip fade';
    tooltip.innerHTML = '<div class="tooltip-arrow"></div><div class="tooltip-inner"></div>';
    tooltip.style.position = 'absolute';
    tooltip.style.zIndex = '1000';
    tooltip.style.display = 'none';
    document.body.appendChild(tooltip);
    
    // Store original titles and setup event listeners
    DOM.tooltipElements.forEach(element => {
        const title = element.getAttribute('title');
        if (title) {
            element.setAttribute('data-original-title', title);
            element.removeAttribute('title');
        }
    });
    
    // Use event delegation for tooltip handling
    document.addEventListener('mouseenter', (e) => {
        if (e.target.hasAttribute('rel') && e.target.getAttribute('rel') === 'tooltip') {
            showTooltip(e.target);
        }
    });
    
    document.addEventListener('mouseleave', (e) => {
        if (e.target.hasAttribute('rel') && e.target.getAttribute('rel') === 'tooltip') {
            hideTooltip();
        }
    });
    
    document.addEventListener('focus', (e) => {
        if (e.target.hasAttribute('rel') && e.target.getAttribute('rel') === 'tooltip') {
            showTooltip(e.target);
        }
    }, true);
    
    document.addEventListener('blur', (e) => {
        if (e.target.hasAttribute('rel') && e.target.getAttribute('rel') === 'tooltip') {
            hideTooltip();
        }
    }, true);
    
    function showTooltip(element) {
        const title = element.getAttribute('data-original-title');
        const placement = element.getAttribute('data-placement') || 'bottom';
        
        if (!title) return;
        
        // Update existing tooltip instead of creating new one
        tooltip.className = `tooltip tooltip-${placement} fade in`;
        tooltip.querySelector('.tooltip-inner').textContent = title;
        tooltip.style.display = 'block';
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let top, left;
        
        switch (placement) {
            case 'top':
                top = rect.top - tooltipRect.height - 5;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'bottom':
                top = rect.bottom + 5;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'left':
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.left - tooltipRect.width - 5;
                break;
            case 'right':
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.right + 5;
                break;
            default:
                top = rect.bottom + 5;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        }
        
        // Adjust for viewport
        top = Math.max(0, top + window.pageYOffset);
        left = Math.max(0, left + window.pageXOffset);
        
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    }
    
    function hideTooltip() {
        tooltip.style.display = 'none';
    }
}

// Menu toggle functionality
function initMenuToggle() {
    function toggleSidebar(e) {
        e.preventDefault();
        DOM.sidebarWrapper.classList.toggle('active');
    }
    
    if (DOM.menuClose) {
        DOM.menuClose.addEventListener('click', toggleSidebar);
    }
    
    if (DOM.menuToggle) {
        DOM.menuToggle.addEventListener('click', toggleSidebar);
    }
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    DOM.smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (location.pathname.replace(/^\//, '') === link.pathname.replace(/^\//, '') || 
                location.hostname === link.hostname) {
                
                const targetHash = link.hash;
                const target = document.querySelector(targetHash);
                
                if (target) {
                    e.preventDefault();
                    
                    // Use native smooth scrolling if supported
                    if ('scrollBehavior' in document.documentElement.style) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        // Fallback to custom animation for older browsers
                        const targetOffset = target.offsetTop;
                        const startOffset = window.pageYOffset;
                        const distance = targetOffset - startOffset;
                        const duration = 1000;
                        let startTime = null;
                        
                        function animation(currentTime) {
                            if (startTime === null) startTime = currentTime;
                            const timeElapsed = currentTime - startTime;
                            const progress = Math.min(timeElapsed / duration, 1);
                            const easeInOutQuad = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
                            
                            window.scrollTo(0, startOffset + distance * easeInOutQuad);
                            
                            if (timeElapsed < duration) {
                                requestAnimationFrame(animation);
                            }
                        }
                        
                        requestAnimationFrame(animation);
                    }
                }
            }
        });
    });
}

// Combined scroll event handler for animations and scroll depth tracking
function initScrollHandler() {
    const trackedScrollDepth = new Set();
    
    function handleScroll() {
        const scrollPosition = window.pageYOffset + window.innerHeight;
        
        // Handle scroll animations
        DOM.slideRightElements.forEach(element => {
            if (!element.classList.contains('slideRight') && element.offsetTop < scrollPosition - 100) {
                element.classList.add('slideRight');
            }
        });
        
        DOM.slideDownElements.forEach(element => {
            if (!element.classList.contains('slideDown') && element.offsetTop < scrollPosition - 100) {
                element.classList.add('slideDown');
            }
        });
        
        // Handle scroll depth tracking
        if (!trackedScrollDepth.has('portfolio') && DOM.scrollDepthElements.portfolio && DOM.scrollDepthElements.portfolio.offsetTop <= scrollPosition) {
            trackedScrollDepth.add('portfolio');
            console.log('Scroll depth reached: #portfolio');
        }
        
        if (!trackedScrollDepth.has('contact') && DOM.scrollDepthElements.contact && DOM.scrollDepthElements.contact.offsetTop <= scrollPosition) {
            trackedScrollDepth.add('contact');
            console.log('Scroll depth reached: #contact');
        }
    }
    
    // Initial check
    handleScroll();
    
    // Add single scroll event listener with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Initialize all functions when document is ready
ready(() => {
    cacheDOM(); // Cache DOM elements first
    initTooltips();
    initMenuToggle();
    initSmoothScrolling();
    initScrollHandler(); // Combined scroll handler for animations and depth tracking
});
