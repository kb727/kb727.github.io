/*
* Main JavaScript file containing core site functionality:
* scroll animations (IntersectionObserver) and sidebar menu
* (with focus trap + ESC). Social media share functions are inline
* in each HTML file for file:// protocol compatibility.
*/
(function () {
    'use strict';

<<<<<<< HEAD
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
=======
    // Flag: tells the inline fallback (in HTML) that main.js loaded successfully.
    // Under file:// protocol, CSP may block this external script; the fallback
    // then activates to keep the sidebar navigation functional.
    window.__kb727 = true;

    /* ===== Slide Right Animation via IntersectionObserver ===== */
    function initSlideRight() {
        var elements = document.querySelectorAll('.toSlideRight');
        if (!elements.length) return;

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('slideRight');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -150px 0px' });

            elements.forEach(function (el) { observer.observe(el); });
>>>>>>> 0437e12a1cdaef6dbec758eaa4934c52ee372c67
        } else {
            // Fallback: scroll-based, rAF-throttled (legacy browsers)
            var ticking = false;
            function onScroll() {
                if (!ticking) {
                    window.requestAnimationFrame(function () {
                        elements.forEach(function (el) {
                            if (el.getBoundingClientRect().top < window.innerHeight - 150) {
                                el.classList.add('slideRight');
                            }
                        });
                        ticking = false;
                    });
                    ticking = true;
                }
            }
            window.addEventListener('scroll', onScroll);
            onScroll();
        }
    }

    /* ===== Sidebar Menu (toggle + focus trap + ESC) ===== */
    var lastFocusedElement = null;

    function toggleMenu(open) {
        var sidebar = document.getElementById('sidebar-wrapper');
        var toggle = document.getElementById('menu-toggle');
        if (!sidebar) return;

        var isActive = sidebar.classList.contains('active');
        var willOpen = typeof open === 'boolean' ? open : !isActive;

        if (willOpen) {
            sidebar.style.right = '0px';
            sidebar.classList.add('active');
<<<<<<< HEAD
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
=======
            sidebar.setAttribute('aria-hidden', 'false');
            if (toggle) toggle.setAttribute('aria-expanded', 'true');
            lastFocusedElement = document.activeElement;
            var firstFocusable = sidebar.querySelector('a[href], button');
            if (firstFocusable) firstFocusable.focus();
        } else {
            sidebar.style.right = '-250px';
            sidebar.classList.remove('active');
            sidebar.setAttribute('aria-hidden', 'true');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
            if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
                lastFocusedElement.focus();
            }
        }
    }

    function initSidebar() {
        var toggle = document.getElementById('menu-toggle');
        var closeBtn = document.getElementById('menu-close');
        var sidebar = document.getElementById('sidebar-wrapper');

        if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-controls', 'sidebar-wrapper');
            toggle.setAttribute('role', 'button');
            toggle.addEventListener('click', function (e) {
                e.preventDefault();
                toggleMenu();
            });
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', function (e) {
                e.preventDefault();
                toggleMenu(false);
            });
        }
        if (sidebar) {
            sidebar.setAttribute('role', 'navigation');
            sidebar.setAttribute('aria-hidden', 'true');
        }

        // ESC to close sidebar
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
                toggleMenu(false);
            }
        });

        // Focus trap within sidebar when active
        if (sidebar) {
            sidebar.addEventListener('keydown', function (e) {
                if (e.key !== 'Tab' || !sidebar.classList.contains('active')) return;
                var focusable = sidebar.querySelectorAll('a[href], button');
                if (!focusable.length) return;
                var first = focusable[0];
                var last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            });
        }
    }

    /* ===== Init ===== */
    function init() {
        document.documentElement.classList.add('loaded');
        initSlideRight();
        initSidebar();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
>>>>>>> 0437e12a1cdaef6dbec758eaa4934c52ee372c67
