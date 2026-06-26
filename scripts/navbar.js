function setActiveNav(clickedLink) {
    document.querySelectorAll('.navigations-links').forEach(link => {
        link.classList.remove('active');
    });
    clickedLink.parentElement.classList.add('active');
    closeModal();
}

function toggleModal() {
    getModalSettings();
    if (modal.classList.contains('dNone')) {
        modal.classList.remove('dNone');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                modal.classList.add('show');
            });
        });
    } else {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.classList.add('dNone');
        }, 300);
    }
}

function getModalSettings() {
    let modal = document.querySelector('.modal');
    const menuIconTop = document.querySelector('.menu-icon-line-top');
    const menuIconMiddle = document.querySelector('.menu-icon-line-middle');
    const menuIconBottom = document.querySelector('.menu-icon-line-bottom');
    menuIconTop.classList.toggle('active');
    menuIconMiddle.classList.toggle('active');
    menuIconBottom.classList.toggle('active');
}

function closeModal() {
    const modal = document.querySelector('.modal');
    const menuIconTop = document.querySelector('.menu-icon-line-top');
    const menuIconMiddle = document.querySelector('.menu-icon-line-middle');
    const menuIconBottom = document.querySelector('.menu-icon-line-bottom');
    if (menuIconTop) menuIconTop.classList.remove('active');
    if (menuIconMiddle) menuIconMiddle.classList.remove('active');
    if (menuIconBottom) menuIconBottom.classList.remove('active');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.classList.add('dNone');
    }, 300);
}

function navigateToHome() {
    window.location.href = './index.html';
}

function navigateToSection(sectionId) {
    const currentPage = window.location.pathname;
    if (currentPage.includes('index.html') || currentPage === '/' || currentPage.endsWith('/')) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            setActiveNav(event.target);
        }
    } else {
        window.location.href = `./index.html?scrollTo=${sectionId}`;
    }
    closeModal();
}