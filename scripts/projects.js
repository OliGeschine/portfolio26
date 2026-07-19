/**
 * @typedef {Object} Project
 * @property {string} title - The title of the project
 * @property {string} description - A brief description of the project
 * @property {string} usedSkills - Technologies and skills used in the project
 * @property {string} img - Path to the project's preview image
 * @property {string} github - URL to the project's GitHub repository
 * @property {string} live - URL to the live demo of the project
 */

/**
 * Array containing all portfolio projects.
 * Each project includes details like title, description, skills, images, and links.
 * @type {Project[]}
 */
let projects = [
    {
        title: "El Pollo Loco",
        description: "Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.",
        usedSkills: "JavaScript | HTML | CSS",
        img: "./assets/img/pollo_loco.png",
        github: "https://github.com/OliGeschine/el_pollo_loco",
        live: "https://oliver-geschine.de/el_pollo_loco/index.html"
    },
    {
        title: "Join",
        description: "Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.",
        usedSkills: "JavaScript | HTML | CSS | Firebase",
        img: "./assets/img/join.png",
        github: "https://github.com/OliGeschine/join",
        live: "https://oliver-geschine.de/join/index.html"
    },
    {
        title: "Pokedex",
        description: "A Pokédex application that allows users to search and view details of various Pokémon.",
        usedSkills: "JavaScript | HTML | CSS | API",
        img: "./assets/img/pokedex.png",
        github: "https://github.com/OliGeschine/pokedex",
        live: "https://oliver-geschine.de/pokedex/index.html"
    },
];

/**
 * Counter tracking the number of currently rendered projects.
 * Used for pagination or lazy loading functionality.
 * @type {number}
 * @default 0
 */
let currentProjectCount = 0;

/**
 * Renders all projects from the projects array to the DOM.
 * Creates project containers with images, overlays, and project information.
 * Appends each project to the projectList element.
 * @returns {void}
 */
function renderProjects() {
    let projectList = document.querySelector('#projectList');
    for (let i = 0; i < projects.length; i++) {
        let project = projects[i];
        let projectContainer = getModalLayout(project, i);
        addHoverEvents(projectContainer);
        projectList.appendChild(projectContainer);
    }
}

/**
 * Creates the HTML structure for a project card.
 * Generates a container with project image, overlay, buttons, and project details.
 * @param {Project} project - The project object containing all project information
 * @param {number} i - The index of the project in the projects array
 * @returns {HTMLDivElement} The complete project container element
 */
function getModalLayout(project, i) {
    let projectContainer = document.createElement('div');
    projectContainer.classList.add('project_container');
    projectContainer.innerHTML = `
            <div id="img">
                <img id="projectImg" class="project-container-img" src="${project.img}" alt="">
            </div>
            <div class="overlay dNonePortfolio">
                <div class="button_container">
                    <a class="git_button" href="${project.github}" target="_blank">Github</a>
                    <a class="live_button" href="${project.live}" target="_blank">Live test</a>
                </div>
                <div class="info_container">
                    <h2 id="title">${project.title}</h2>
                    <span id="description" class="project-description" data-translate="portfolio.project${i + 1}.description">${project.description}</span>
                    <span id="usedSkills" class="used-skills">${project.usedSkills}</span>
                </div>`;
    return projectContainer;
}

/**
 * Adds hover event listeners to a project container.
 * Shows/hides the overlay and applies zoom effect to the image on mouse enter/leave.
 * Uses optional chaining to safely handle potentially missing elements.
 * @param {HTMLDivElement} container - The project container element to attach events to
 * @returns {void}
 */
function addHoverEvents(container) {
    const img = container.querySelector('.project-container-img');
    const overlay = container.querySelector('.overlay');
    container.addEventListener('mouseenter', function () {
        overlay?.classList.remove('dNonePortfolio');
        img?.classList.add('zoomed');
    });
    container.addEventListener('mouseleave', function () {
        overlay?.classList.add('dNonePortfolio');
        img?.classList.remove('zoomed');
    });
}

/**
 * Initializes the scroll animation for the portfolio headline container.
 * Uses Intersection Observer to trigger slide-in/out animations based on scroll position.
 * Observes the entire portfolio section for better reliability.
 * @returns {void}
 */
function initPortfolioAnimation() {
    const headlineContainer = document.querySelector('.headline_container');
    const portfolioSection = document.querySelector('.portfolio_section');
    if (!headlineContainer || !portfolioSection) return;
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
        threshold: 0.2,
        rootMargin: '0px'
    });
    observer.observe(portfolioSection);
}

/**
 * Event listener for page load event.
 * Initializes portfolio headline animation when the page loads.
 */
window.addEventListener('load', initPortfolioAnimation);