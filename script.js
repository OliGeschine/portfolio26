/**
 * Initializes the application on page load.
 * Includes HTML components, initializes navbar, sets language, renders projects and contact form.
 * @returns {void}
 */
function init() {
    includeHTML().then(() => {
        initNavbar();
        getActiveLanguage();
    });
    const projectList = document.getElementById('projectList');
    if (projectList && projectList.children.length === 0) {
        renderProjects();
    }
    const commentImg = document.getElementById('comment_img');
    if (commentImg) {
        renderComments();
        initContactForm();
    }
}

/**
 * Initializes the navigation bar components.
 * Checks if modal and burger menu elements exist and logs initialization status.
 * @returns {void}
 */
function initNavbar() {
    const modal = document.querySelector('.modal');
    const burgerMenu = document.getElementById('burger_menu');
    if (burgerMenu && modal) {
    }
}

/////// Side Translation ///////

/**
 * Current language of the application.
 * @type {string}
 * @default 'en'
 */
let currentLanguage = 'en';

/**
 * Sets the application language to German.
 * Updates localStorage, translates page content, re-renders comments and updates language buttons.
 * @returns {void}
 */
function setLanguageDE() {
    currentLanguage = 'de';
    localStorage.setItem('preferredLanguage', 'de');
    translatePage('de');
    if (document.getElementById('comment_img')) {
        renderComments();
    }
    updateLanguageButtons('de');
}

/**
 * Updates language buttons in both desktop and modal navigation.
 * @param {string} lang - The language code ('en' or 'de')
 * @returns {void}
 */
function updateLanguageButtons(lang) {
    changeDesktopButtons(lang);
    changeModalButtons(lang);
}

/**
 * Updates desktop navigation language buttons to reflect the active language.
 * @param {string} lang - The language code ('en' or 'de')
 * @returns {void}
 */
function changeDesktopButtons(lang) {
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
}

/**
 * Updates modal navigation language buttons to reflect the active language.
 * @param {string} lang - The language code ('en' or 'de')
 * @returns {void}
 */
function changeModalButtons(lang) {
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

/**
 * Sets the application language to English.
 * Updates localStorage, translates page content, re-renders comments and updates language buttons.
 * @returns {void}
 */
function setLanguageEN() {
    currentLanguage = 'en';
    localStorage.setItem('preferredLanguage', 'en');
    translatePage('en');
    if (document.getElementById('comment_img')) {
        renderComments();
    }
    updateLanguageButtons('en');
}

/**
 * Translates all elements on the page based on data-translate attributes.
 * Updates both innerHTML content and placeholder attributes.
 * @param {string} lang - The language code ('en' or 'de')
 * @returns {void}
 */
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

/**
 * DOMContentLoaded event listener.
 * Initializes the app and handles URL-based scroll navigation.
 * @listens DOMContentLoaded
 */
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

/**
 * Retrieves and applies the user's preferred language from localStorage.
 * Defaults to English if no preference is saved.
 * @returns {void}
 */
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

/**
 * Sets the application language to German via modal navigation.
 * Updates localStorage, translates page content, re-renders comments and updates language buttons.
 * @returns {void}
 */
function setLanguageDEModal() {
    currentLanguage = 'de';
    localStorage.setItem('preferredLanguage', 'de');
    translatePage('de');
    if (document.getElementById('comment_img')) {
        renderComments();
    }
    updateLanguageButtons('de');
}

/**
 * Sets the application language to English via modal navigation.
 * Updates localStorage, translates page content, re-renders comments and updates language buttons.
 * @returns {void}
 */
function setLanguageENModal() {
    currentLanguage = 'en';
    localStorage.setItem('preferredLanguage', 'en');
    translatePage('en');
    if (document.getElementById('comment_img')) {
        renderComments();
    }
    updateLanguageButtons('en');
}

/**
 * Initializes the scroll animation for the landing section links.
 * Uses Intersection Observer to trigger slide-in/out animations based on scroll position.
 * Observes the entire landing section for better reliability.
 * @returns {void}
 */
function initLandingAnimation() {
    const linksContainer = document.querySelector('.links');
    const landingSection = document.querySelector('.landing-section');
    if (!linksContainer || !landingSection) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                linksContainer.classList.remove('slide-out');
                linksContainer.classList.add('slide-in');
            } else {
                linksContainer.classList.remove('slide-in');
                linksContainer.classList.add('slide-out');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px'
    });
    observer.observe(landingSection);
}

/**
 * Event listener for page load event.
 * Initializes landing section links animation when the page loads.
 */
window.addEventListener('load', initLandingAnimation);