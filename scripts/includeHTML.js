/**
 * Dynamically loads and injects HTML components into elements 
 * with the attribute `w3-include-html`. 
 * 
 * This function returns a Promise that resolves when all includes are loaded.
 * 
 * @returns {Promise<void>} A Promise that resolves when all HTML includes are finished loading.
 */
async function includeHTML() {
    const includeElements = document.querySelectorAll('[w3-include-html]');
    const promises = Array.from(includeElements).map(async (element) => {
        const file = element.getAttribute('w3-include-html');
        if (file) {
            try {
                const response = await fetch(file);
                if (response.ok) {
                    const html = await response.text();
                    element.innerHTML = html;
                    element.removeAttribute('w3-include-html');
                } else {
                    element.innerHTML = 'Page not found.';
                }
            } catch (error) {
                console.error('Error loading HTML:', error);
                element.innerHTML = 'Error loading content.';
            }
        }
    });
    await Promise.all(promises);
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    translatePage(savedLang);
    updateLanguageButtons(savedLang);
}