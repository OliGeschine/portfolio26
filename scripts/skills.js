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