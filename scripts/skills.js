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

window.addEventListener('resize', showSkills);
window.addEventListener('load', showSkills);