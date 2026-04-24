/////// side translation ///////
let currentLanguage = 'en';

function setLanguageDE() {
    currentLanguage = 'de';
    translatePage('de');
    document.getElementById('de_active')?.classList.add('active');
    document.getElementById('en_active')?.classList.remove('active');
}

function setLanguageEN() {
    currentLanguage = 'en';
    localStorage.setItem('preferredLanguage', 'en');
    translatePage('en');
    document.getElementById('en_active')?.classList.add('active');
    document.getElementById('de_active')?.classList.remove('active');
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

// Sprache aus URL laden: mysite.com?lang=de
function initLanguageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang') || 'en';
    if (lang === 'en') {
        setLanguageEN();
    } else {
        setLanguageDE();
    }
}

function updateLanguageButtons(activeLang) {
    document.getElementById('de_active')?.classList.remove('active');
    document.getElementById('en_active')?.classList.remove('active');
    document.getElementById(`${activeLang}_active`)?.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'de';
    if (savedLang === 'en') {
        setLanguageEN();
    } else {
        setLanguageDE();
    }
    const urlParams = new URLSearchParams(window.location.search);
    const scrollTarget = urlParams.get('scrollTo');
    if (scrollTarget) {
        setTimeout(() => {
            const targetElement = document.getElementById(scrollTarget);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                console.log('Scrolled to:', scrollTarget);
            } else {
                console.log('Element not found:', scrollTarget);
            }
        }, 300);
    }
});