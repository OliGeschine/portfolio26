function toggleLanguageIcon() {
    document.getElementById('de_active')?.classList.toggle('dNone');
    document.getElementById('en_active')?.classList.toggle('dNone');
}


// document.addEventListener('DOMContentLoaded', function () {
//     let projectContainer = document.querySelector('.project_container');

//     if (projectContainer) {
//         projectContainer.addEventListener('mouseover', function () {
//             console.log("maus ist über dem element");

//             document.getElementById('overlay')?.classList.remove('dNone');
//             document.getElementById('overlay')?.classList.add('overlay');
//             document.getElementById('projectImg')?.classList.remove('project-container-img');
//             document.getElementById('projectImg')?.classList.add('zoomed');
//         });

//         projectContainer.addEventListener('mouseout', function () {
//             document.getElementById('overlay')?.classList.add('dNone');
//             document.getElementById('overlay')?.classList.remove('overlay');
//             document.getElementById('projectImg')?.classList.remove('zoomed');
//             document.getElementById('projectImg')?.classList.add('project-container-img');
//         });
//     }
// });


let projects = [
    {
        title: "El Pollo Loco",
        description: "Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.",
        usedSkills: "JavaScript | HTML | CSS",
        img: "./assets/img/pollo_loco.png",
    },
    {
        title: "Join",
        description: "Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.",
        usedSkills: "JavaScript | HTML | CSS | Firebase",
        img: "./assets/img/join.png",
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
                    <button class="git_button">Github</button>
                    <button class="live_button">Live test</button>
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