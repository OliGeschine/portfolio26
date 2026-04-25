/**
 * Dynamically loads and injects HTML components into elements 
 * with the attribute `w3-include-html`. 
 * 
 * This function returns a Promise that resolves when all includes are loaded.
 * 
 * @returns {Promise<void>} A Promise that resolves when all HTML includes are finished loading.
 */
function includeHTML() {
    return new Promise((resolve) => {
        let elements = document.querySelectorAll('[w3-include-html]');
        let total = elements.length;
        let loaded = 0;
        elements.forEach(elmnt => {
            let file = elmnt.getAttribute('w3-include-html');
            fetch(file)
                .then(response => {
                    if (!response.ok) throw new Error('Include failed');
                    return response.text();
                })
                .then(data => {
                    elmnt.innerHTML = data;
                    elmnt.removeAttribute('w3-include-html');
                    loaded++;
                    if (loaded === total) resolve();
                })
                .catch(error => {
                    elmnt.innerHTML = "Error loading component";
                    console.error(error);
                    loaded++;
                    if (loaded === total) resolve();
                });
        });

        if (total === 0) resolve(); // sofort fertig, wenn nichts zu laden
    });
}