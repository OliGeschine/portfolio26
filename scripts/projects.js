let projects = [
    {
        title: "El Pollo Loco",
        description: "Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.",
        usedSkills: "JavaScript | HTML | CSS",
        img: "./assets/img/pollo_loco.png",
        github: "https://github.com/OliGeschine/el_pollo_loco",
        live: "https://oliver-geschine.developerakademie.net/el_pollo_loco/index.html"
    },
    {
        title: "Join",
        description: "Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.",
        usedSkills: "JavaScript | HTML | CSS | Firebase",
        img: "./assets/img/join.png",
        github: "https://github.com/OliGeschine/join",
        live: "https://oliver-geschine.developerakademie.net/join/index.html"
    },
    {
        title: "Pokedex",
        description: "A Pokédex application that allows users to search and view details of various Pokémon.",
        usedSkills: "JavaScript | HTML | CSS | API",
        img: "./assets/img/pokedex.png",
        github: "https://github.com/OliGeschine/pokedex",
        live: "https://oliver-geschine.developerakademie.net/pokedex/index.html"
    },
];

let currentProjectCount = 0;

function renderProjects() {
    let projectList = document.querySelector('#projectList');
    for (let i = 0; i < projects.length; i++) {
        let project = projects[i];

        let projectContainer = document.createElement('div');
        projectContainer.classList.add('project_container');
        projectContainer.innerHTML = `
            <div id="img">
                <img id="projectImg" class="project-container-img" src="${project.img}" alt="">
            </div>
            <div class="overlay dNone">
                <div class="button_container">
                    <a class="git_button" href="${project.github}" target="_blank">Github</a>
                    <a class="live_button" href="${project.live}" target="_blank">Live test</a>
                </div>
                <div class="info_container">
                    <h2 id="title">${project.title}</h2>
                    <span id="description" class="project-description">${project.description}</span>
                    <span id="usedSkills" class="used-skills">${project.usedSkills}</span>
                </div>`;
        addHoverEvents(projectContainer);
        projectList.appendChild(projectContainer);
    }
}

function addHoverEvents(container) {
    const img = container.querySelector('.project-container-img');
    const overlay = container.querySelector('.overlay');

    container.addEventListener('mouseenter', function () {
        overlay?.classList.remove('dNone');
        img?.classList.add('zoomed');
    });

    container.addEventListener('mouseleave', function () {
        overlay?.classList.add('dNone');
        img?.classList.remove('zoomed');
    });
}