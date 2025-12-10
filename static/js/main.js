// Local-only version - Native JavaScript implementation
// Replaces jQuery and Bootstrap JavaScript dependencies

// Document ready function
function ready(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

// Simple tooltip implementation
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[rel="tooltip"]');
    
    tooltipElements.forEach(element => {
        const title = element.getAttribute('title');
        const placement = element.getAttribute('data-placement') || 'bottom';
        
        if (title) {
            // Store original title and remove it from DOM to prevent browser default tooltip
            element.setAttribute('data-original-title', title);
            element.removeAttribute('title');
            
            // Add event listeners for tooltip
            element.addEventListener('mouseenter', showTooltip);
            element.addEventListener('mouseleave', hideTooltip);
            element.addEventListener('focus', showTooltip);
            element.addEventListener('blur', hideTooltip);
        }
    });
}

function showTooltip(e) {
    const element = e.target;
    const title = element.getAttribute('data-original-title');
    const placement = element.getAttribute('data-placement') || 'bottom';
    
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = `tooltip tooltip-${placement} fade in`;
    tooltip.innerHTML = `<div class="tooltip-arrow"></div><div class="tooltip-inner">${title}</div>`;
    tooltip.id = 'temp-tooltip';
    
    // Add tooltip to body
    document.body.appendChild(tooltip);
    
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
    
    tooltip.style.position = 'absolute';
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    tooltip.style.zIndex = '1000';
}

function hideTooltip() {
    const tooltip = document.getElementById('temp-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Menu toggle functionality
function initMenuToggle() {
    const menuClose = document.getElementById('menu-close');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    
    if (menuClose) {
        menuClose.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarWrapper.classList.toggle('active');
        });
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarWrapper.classList.toggle('active');
        });
    }
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href*="#"]:not([href="#"])');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (location.pathname.replace(/^\//, '') === link.pathname.replace(/^\//, '') || 
                location.hostname === link.hostname) {
                
                const targetHash = link.hash;
                const target = document.querySelector(targetHash);
                
                if (target) {
                    e.preventDefault();
                    
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
        });
    });
}

// Scroll detection for animations
function initScrollAnimations() {
    function checkScroll() {
        const scrollPosition = window.pageYOffset + window.innerHeight;
        
        // Check slideRight elements
        const slideRightElements = document.querySelectorAll('.toSlideRight');
        slideRightElements.forEach(element => {
            const elementPosition = element.offsetTop;
            if (elementPosition < scrollPosition - 100) {
                element.classList.add('slideRight');
            }
        });
        
        // Check slideDown elements
        const slideDownElements = document.querySelectorAll('.toSlideDown');
        slideDownElements.forEach(element => {
            const elementPosition = element.offsetTop;
            if (elementPosition < scrollPosition - 100) {
                element.classList.add('slideDown');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Add scroll event listener with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                checkScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Simplified scroll depth tracking
function initScrollDepth() {
    const elements = ['#portfolio', '#contact'];
    const trackedElements = new Set();
    
    function checkScrollDepth() {
        const scrollPosition = window.pageYOffset + window.innerHeight;
        
        // Check elements
        elements.forEach(selector => {
            if (!trackedElements.has(selector)) {
                const element = document.querySelector(selector);
                if (element && element.offsetTop <= scrollPosition) {
                    trackedElements.add(selector);
                    // You could add analytics tracking here if needed
                    console.log(`Scroll depth reached: ${selector}`);
                }
            }
        });
    }
    
    // Initial check
    checkScrollDepth();
    
    // Add scroll event listener with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                checkScrollDepth();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Initialize all functions when document is ready
ready(() => {
    initTooltips();
    initMenuToggle();
    initSmoothScrolling();
    initScrollAnimations();
    initScrollDepth();
});
