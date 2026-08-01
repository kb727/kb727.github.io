/*
* Main JavaScript file containing all site functionality
* Optimized for performance and minimal dependencies
*/

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
    addAccessibilityAttributes();

    // Trigger slideRight on page load to handle elements already in view
    slideRight();
}

// Initialize site functionality when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Expose functions globally for inline event handlers
window.toggleMenu = toggleMenu;
