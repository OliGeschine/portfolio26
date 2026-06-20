function init() {
    includeHTML().then(() => {
        initNavbar();
        getActiveLanguage();
    });
    if (document.getElementById('comment_img')) {
        renderProjects();
        renderComments();
        initContactForm();
    }
}

function initNavbar() {
    const modal = document.querySelector('.modal');
    const burgerMenu = document.getElementById('burger_menu');
    if (burgerMenu && modal) {
        console.log('Navbar initialized');
    }
}

/////// side translation ///////
let currentLanguage = 'en';

function setLanguageDE() {
    currentLanguage = 'de';
    localStorage.setItem('preferredLanguage', 'de');
    translatePage('de');
    if (document.getElementById('comment_img')) {
        renderComments();
    }
    updateLanguageButtons('de');
}

function updateLanguageButtons(lang) {
    const deButton = document.getElementById('de_button');
    const enButton = document.getElementById('en_button');
    if (deButton && enButton) {
        if (lang === 'de') {
            deButton.classList.add('active');
            enButton.classList.remove('active');
        } else {
            enButton.classList.add('active');
            deButton.classList.remove('active');
        }
    }
    const deButtonModal = document.getElementById('de_button_modal');
    const enButtonModal = document.getElementById('en_button_modal');
    if (deButtonModal && enButtonModal) {
        if (lang === 'de') {
            deButtonModal.classList.add('active');
            enButtonModal.classList.remove('active');
        } else {
            enButtonModal.classList.add('active');
            deButtonModal.classList.remove('active');
        }
    }
}

function setLanguageEN() {
    currentLanguage = 'en';
    localStorage.setItem('preferredLanguage', 'en');
    translatePage('en');
    if (document.getElementById('comment_img')) {
        renderComments();
    }
    updateLanguageButtons('en');
}

function translatePage(lang) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = translations[lang]?.[key];
        if (translation) {
            element.innerHTML = translation;
        }
    });
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        const translation = translations[lang]?.[key];
        if (translation) {
            element.placeholder = translation;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    const urlParams = new URLSearchParams(window.location.search);
    const scrollTarget = urlParams.get('scrollTo');
    if (scrollTarget) {
        setTimeout(() => {
            const targetElement = document.getElementById(scrollTarget);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    }
});

function getActiveLanguage() {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    if (savedLang === 'en') {
        setLanguageEN();
        setLanguageENModal();
    } else {
        setLanguageDE();
        setLanguageDEModal();
    }
}


/////// Modal ///////

function setLanguageDEModal() {
    currentLanguage = 'de';
    localStorage.setItem('preferredLanguage', 'de');
    translatePage('de');
    if (document.getElementById('comment_img')) {
        renderComments();
    }
    updateLanguageButtons('de');
}

function setLanguageENModal() {
    currentLanguage = 'en';
    localStorage.setItem('preferredLanguage', 'en');
    translatePage('en');
    if (document.getElementById('comment_img')) {
        renderComments();
    }
    updateLanguageButtons('en');
}