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
* Triggered on scroll for elements with 'slideRight' class
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
function toggleMenu() {
    const sidebar = document.getElementById('sidebar-wrapper');
    if (sidebar) {
        if (sidebar.classList.contains('active')) {
            sidebar.style.right = '-250px';
            sidebar.classList.remove('active');
        } else {
            sidebar.style.right = '0px';
            sidebar.classList.add('active');
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
    
    // Handle specific mobile menu toggle in default.html
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
* Initialize all site functionality
*/
function init() {
    // Mark page as loaded
    document.documentElement.classList.add('loaded');
    
    // Setup event listeners
    window.addEventListener('scroll', slideRight);
    
    // Initialize components
    setupCardClickHandlers();
    addAccessibilityAttributes();
    setupMobileMenuHandler();
    
    // Trigger slideRight on page load to handle elements already in view
    slideRight();
}

// Initialize site functionality when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Expose functions globally for inline event handlers
window.smoothScroll = smoothScroll;
window.toggleMenu = toggleMenu;