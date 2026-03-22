const EMAIL_CONFIG = {
    serviceId: 'service_vet94ip',     // Ersetzen Sie mit Ihrer EmailJS Service ID
    templateId: 'template_h8anrii',   // Ersetzen Sie mit Ihrer EmailJS Template ID
    publicKey: 'FjqmytnRfRDnz8Rhd'      // Ersetzen Sie mit Ihrem EmailJS Public Key
};
let hasError = false; // Global definieren
let isFormValid = false;

function initEmailJS() {
    emailjs.init(EMAIL_CONFIG.publicKey);
}

function enableMsgButton() {
    let checkbox = document.getElementById("checkbox");
    let sendMessageButton = document.getElementById("sendMessageButton");

    if (checkbox.checked && isFormValid) { // ⚠️ HINZUGEFÜGT: && isFormValid
        sendMessageButton.disabled = false;
        sendMessageButton.classList.add("checked");
    } else {
        sendMessageButton.disabled = true;
        sendMessageButton.classList.remove("checked");
    }
}

// Event-Listener für das Formular hinzufügen
function initContactForm() {
    initEmailJS();
    const sendButton = document.getElementById('sendMessageButton');
    const checkbox = document.getElementById('checkbox'); // ⚠️ KORRIGIERT: checkbox definieren

    // Submit Event für Button
    sendButton.addEventListener('click', handleFormSubmit);
    checkbox.addEventListener('change', enableMsgButton);

    // Real-time Validation für Input-Felder - ⚠️ KORRIGIERT: input statt blur
    document.getElementById('contactName').addEventListener('input', validateFormRealTime);
    document.getElementById('contactEmail').addEventListener('input', validateFormRealTime);
    document.getElementById('contactMessage').addEventListener('input', validateFormRealTime);

    // Blur-Events für detaillierte Validierung
    document.getElementById('contactName').addEventListener('blur', validateSingleField);
    document.getElementById('contactEmail').addEventListener('blur', validateSingleField);
    document.getElementById('contactMessage').addEventListener('blur', validateSingleField);
}

async function validateFormRealTime() {
    const isValid = await validateContactInput(false); // false = keine Error-Messages anzeigen
    isFormValid = isValid;
    enableMsgButton(); // Button-Status aktualisieren
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const sendButton = document.getElementById('sendMessageButton');
    const originalText = sendButton.innerHTML;

    // Button deaktivieren und Loading-Zustand anzeigen
    sendButton.disabled = true;
    sendButton.innerHTML = 'Sending...';
    sendButton.classList.add('loading');

    try {
        const isValid = await validateContactInput(true); // true = Error-Messages anzeigen

        if (isValid) {
            const success = await sendContactForm();
            if (success) {
                showSuccessMessage();
                resetForm();
            } else {
                showErrorMessage('Failed to send message. Please try again.');
            }
        }
    } catch (error) {
        console.error('Error sending form:', error);
        showErrorMessage('An error occurred. Please try again.');
    } finally {
        // Button zurücksetzen
        sendButton.disabled = false;
        sendButton.innerHTML = originalText;
        sendButton.classList.remove('loading');
        enableMsgButton();
    }
}

async function validateSingleField(event) {
    const fieldId = event.target.id;

    if (fieldId === 'contactEmail') {
        await validateAddEmailFormat();
    } else if (fieldId === 'contactMessage') {
        await validateMessageFormat();
    }

    // Form-Status nach einzelner Feldvalidierung aktualisieren
    validateFormRealTime();
}

async function validateContactInput(showErrors = true) {
    let inputs = getContactInputs();
    let values = {
        name: inputs.nameInput.value.trim(),
        email: inputs.emailInput.value.trim().toLowerCase(),
        message: inputs.messageInput.value.trim()
    };

    if (showErrors) {
        resetContactInputErrors(inputs);
    }
    hasError = false;

    if (checkEmptyFields(inputs, values, showErrors)) return false;

    let emailValid = await validateAddEmailFormat(showErrors);
    let messageValid = await validateMessageFormat(showErrors);

    return emailValid && messageValid && !hasError;
}

function getContactInputs() {
    return {
        nameInput: document.getElementById('contactName'),
        emailInput: document.getElementById('contactEmail'),
        messageInput: document.getElementById('contactMessage'),
        nameError: document.getElementById('nameError'),
        emailError: document.getElementById('emailError'),
        messageError: document.getElementById('messageError')
    };
}

function resetContactInputErrors(inputs) {
    [inputs.nameInput, inputs.emailInput, inputs.messageInput].forEach(input => {
        if (input) input.classList.remove('error');
    });

    [inputs.nameError, inputs.emailError, inputs.messageError].forEach(el => {
        if (el) {
            el.classList.add('dNone');
            el.innerText = "";
        }
    });

    ['namePlaceholderError', 'emailPlaceholderError', 'messagePlaceholderError'].forEach(id => {
        let el = document.getElementById(id);
        if (el) {
            el.classList.remove('visible');
            el.innerText = "Placeholder";
        }
    });
}

function checkEmptyFields(inputs, values, showErrors = true) {
    let hasEmptyFields = false;

    if (!values.name) {
        if (showErrors) styleNameValues(inputs);
        hasEmptyFields = true;
    }
    if (!values.email) {
        if (showErrors) styleEmailValues(inputs);
        hasEmptyFields = true;
    }
    if (!values.message) {
        if (showErrors) styleMessageValues(inputs);
        hasEmptyFields = true;
    }
    if (!checkbox.checked) {
        if (showErrors) {
            document.querySelector('.error-message').style.display = 'block';
            setTimeout(() => {
                document.querySelector('.error-message').style.display = 'none';
            }, 3000);
        }
        hasEmptyFields = true;
    }

    return hasEmptyFields;
}

function styleNameValues(inputs) {
    inputs.nameInput.classList.add('error');
    document.getElementById('namePlaceholderError').innerHTML = "Please enter a name.";
    document.getElementById('namePlaceholderError').classList.add('visible');
    hideErrorMessages('namePlaceholderError', 'contactName');
    hasError = true;
}

function styleEmailValues(inputs) {
    inputs.emailInput.classList.add('error');
    document.getElementById('emailPlaceholderError').innerHTML = "Please enter an e-mail address.";
    document.getElementById('emailPlaceholderError').classList.add('visible');
    hideErrorMessages('emailPlaceholderError', 'contactEmail');
    hasError = true;
}

function styleMessageValues(inputs) {
    inputs.messageInput.classList.add('error');
    document.getElementById('messagePlaceholderError').innerHTML = "Please enter a message.";
    document.getElementById('messagePlaceholderError').classList.add('visible');
    hideErrorMessages('messagePlaceholderError', 'contactMessage');
    hasError = true;
}

function hideErrorMessages(id, inputId) {
    setTimeout(() => {
        let el = document.getElementById(id);
        let input = document.getElementById(inputId);
        if (el) {
            el.classList.remove('visible');
            el.innerText = "Placeholder";
        }
        if (input) {
            input.classList.remove('error');
        }
    }, 3000);
}

async function validateAddEmailFormat(showErrors = true) {
    let emailInput = document.getElementById("contactEmail");
    let email = emailInput.value.trim().toLowerCase();
    let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let errorMsgEmail = document.getElementById("emailError");

    if (emailInput.value == '') {
        return true; // Leeres Feld wird in checkEmptyFields behandelt
    }

    if (!pattern.test(email)) {
        if (showErrors) patternTestEmail(emailInput, errorMsgEmail);
        return false;
    }

    if (errorMsgEmail && showErrors) errorMsgEmail.classList.add("dNone");
    return true;
}

// Fehlende Funktion hinzufügen
async function validateMessageFormat(showErrors = true) {
    let messageInput = document.getElementById("contactMessage");
    let message = messageInput.value.trim();
    let errorMsgMessage = document.getElementById("messageError");

    if (message === '') {
        return true; // Wird in checkEmptyFields behandelt
    }

    if (message.length < 10) {
        if (showErrors) patternTestMessage(messageInput, errorMsgMessage);
        return false;
    }

    if (errorMsgMessage && showErrors) errorMsgMessage.classList.add("dNone");
    return true;
}

function patternTestEmail(emailInput, errorMsgEmail) {
    emailInput.classList.add("error");
    errorMsgEmail.innerText = "Please enter a valid email address.";
    errorMsgEmail.classList.remove("dNone");
    setTimeout(() => {
        errorMsgEmail.classList.add("dNone");
        errorMsgEmail.innerText = "";
        emailInput.classList.remove("error");
    }, 3000);
}

function patternTestMessage(messageInput, errorMsgMessage) {
    messageInput.classList.add("error");
    errorMsgMessage.innerText = "Message must be at least 10 characters long.";
    errorMsgMessage.classList.remove("dNone");
    setTimeout(() => {
        errorMsgMessage.classList.add("dNone");
        errorMsgMessage.innerText = "";
        messageInput.classList.remove("error");
    }, 3000);
}

async function sendContactForm() {
    try {
        const templateParams = {
            from_name: document.getElementById('contactName').value.trim(),
            from_email: document.getElementById('contactEmail').value.trim(),
            message: document.getElementById('contactMessage').value.trim(),
            to_email: 'oli.geschine@web.de'
        };

        const response = await emailjs.send(
            EMAIL_CONFIG.serviceId,
            EMAIL_CONFIG.templateId,
            templateParams
        );

        console.log('Email sent successfully:', response);
        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        return false;
    }
}

function showSuccessMessage() {
    // Erfolgs-Nachricht anzeigen
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.innerHTML = '✓ Message sent successfully!';

    const contactSection = document.getElementById('contact');
    contactSection.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-message-popup';
    messageDiv.innerHTML = `✗ ${message}`;

    const contactSection = document.getElementById('contact');
    contactSection.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function resetForm() {
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactMessage').value = '';
    document.getElementById('checkbox').checked = false;

    isFormValid = false;
    enableMsgButton();
}