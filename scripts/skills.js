/**
 * Toggles the visibility of desktop and mobile skill sections based on viewport width.
 * Shows desktop skills container for viewports >= 1180px and mobile container for smaller viewports.
 * Automatically adjusts the display when the window is resized or page is loaded.
 * @returns {void}
 */
function showSkills() {
    const skillsDesktop = document.getElementById('skillsDesktop');
    const skillsMobile = document.getElementById('skillsMobile');
    if (window.innerWidth >= 1180) {
        skillsDesktop.classList.remove('skillsDNone');
        skillsMobile.classList.add('skillsDNone');
    } else {
        skillsMobile.classList.remove('skillsDNone');
        skillsDesktop.classList.add('skillsDNone');
    }
}

/**
 * Event listener for window resize events.
 * Calls showSkills() to adjust skills section visibility based on new viewport width.
 */
window.addEventListener('resize', showSkills);

/**
 * Event listener for page load event.
 * Ensures correct skills section is displayed when the page first loads.
 */
window.addEventListener('load', showSkills);

/**
 * Initializes the scroll animation for the skills headline container.
 * Uses Intersection Observer to trigger slide-in/out animations based on scroll position.
 * Observes the entire skills section for better reliability.
 * @returns {void}
 */
function initSkillsAnimation() {
    const headlineContainer = document.querySelector('.skills_headline_container');
    const skillsSection = document.querySelector('.skills_section');
    if (!headlineContainer || !skillsSection) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                headlineContainer.classList.remove('slide-out');
                headlineContainer.classList.add('slide-in');
            } else {
                headlineContainer.classList.remove('slide-in');
                headlineContainer.classList.add('slide-out');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px'
    });
    observer.observe(skillsSection);
}

/**
 * Event listener for page load event.
 * Initializes skills headline animation when the page loads.
 */
window.addEventListener('load', initSkillsAnimation);