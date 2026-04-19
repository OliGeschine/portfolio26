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
    console.log(`Language set to: ${lang}`);
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
    translateSpecialElements(lang);
}

function translateSpecialElements(lang) {
    const lookingSpan = document.querySelector('.h2_container h2');
    const anotherSpan = document.querySelector('.h2_container .purple-span');
    const questionSpan = document.querySelector('.h2_container span:last-child');
    if (lookingSpan) lookingSpan.textContent = translations[lang]['skills.looking'];
    if (anotherSpan) anotherSpan.textContent = translations[lang]['skills.another'];
    if (questionSpan) questionSpan.textContent = translations[lang]['skills.question'];
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
});