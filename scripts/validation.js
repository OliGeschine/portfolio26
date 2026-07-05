/**
 * @typedef {Object} ContactInputs
 * @property {HTMLInputElement} nameInput - Name input field
 * @property {HTMLInputElement} emailInput - Email input field
 * @property {HTMLTextAreaElement} messageInput - Message textarea field
 * @property {HTMLElement} nameError - Name error message element
 * @property {HTMLElement} emailError - Email error message element
 * @property {HTMLElement} messageError - Message error message element
 */

/**
 * @typedef {Object} ContactValues
 * @property {string} name - Trimmed name value
 * @property {string} email - Trimmed and lowercased email value
 * @property {string} message - Trimmed message value
 */

let hasError = false;

/**
 * Validates all contact form inputs.
 * Checks for empty fields, valid email format, and message length.
 * @param {boolean} [showErrors=true] - Whether to display error messages
 * @param {boolean} checkboxChecked - Whether privacy checkbox is checked
 * @returns {Promise<boolean>} True if form is valid, false otherwise
 * @async
 */
async function validateContactInput(showErrors = true, checkboxChecked) {
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
    if (checkEmptyFields(inputs, values, showErrors, checkboxChecked)) return false;
    let emailValid = await validateAddEmailFormat(showErrors);
    let messageValid = await validateMessageFormat(showErrors);
    return emailValid && messageValid && !hasError;
}

/**
 * Retrieves all contact form input elements and their error message elements.
 * @returns {ContactInputs} Object containing all form input and error elements
 */
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

/**
 * Removes error class from all input fields.
 * @param {ContactInputs} inputs - Object containing form input elements
 * @returns {void}
 */
function clearInputErrorClasses(inputs) {
    [inputs.nameInput, inputs.emailInput, inputs.messageInput].forEach(input => {
        if (input) input.classList.remove('error');
    });
}

/**
 * Hides and clears all error message elements.
 * @param {ContactInputs} inputs - Object containing error message elements
 * @returns {void}
 */
function clearErrorMessages(inputs) {
    [inputs.nameError, inputs.emailError, inputs.messageError].forEach(el => {
        if (el) {
            el.classList.add('dNone');
            el.innerText = "";
        }
    });
}

/**
 * Hides all input error icons.
 * @returns {void}
 */
function clearErrorIcons() {
    document.querySelectorAll('.inputIcon').forEach(icon => {
        icon.classList.remove('visible');
    });
}

/**
 * Resets all placeholder error messages to default state.
 * @returns {void}
 */
function clearPlaceholderErrors() {
    ['namePlaceholderError', 'emailPlaceholderError', 'messagePlaceholderError'].forEach(id => {
        let el = document.getElementById(id);
        if (el) {
            el.classList.remove('visible');
            el.innerText = "Placeholder";
        }
    });
}

/**
 * Resets all error states and messages for contact form inputs.
 * @param {ContactInputs} inputs - Object containing form input and error elements
 * @returns {void}
 */
function resetContactInputErrors(inputs) {
    clearInputErrorClasses(inputs);
    clearErrorMessages(inputs);
    clearErrorIcons();
    clearPlaceholderErrors();
}

/**
 * Validates individual form fields and applies error styling if empty.
 * @param {ContactInputs} inputs - Object containing form input elements
 * @param {ContactValues} values - Object containing trimmed input values
 * @param {boolean} showErrors - Whether to display error messages
 * @returns {boolean} True if any field is empty, false otherwise
 */
function validateIndividualFields(inputs, values, showErrors) {
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
    return hasEmptyFields;
}

/**
 * Validates and displays checkbox error if not checked.
 * @param {boolean} showErrors - Whether to display error messages
 * @param {boolean} checkboxChecked - Whether privacy checkbox is checked
 * @returns {boolean} True if checkbox validation fails, false otherwise
 */
function validateCheckboxState(showErrors, checkboxChecked) {
    if (showErrors && !checkboxChecked) {
        displayCheckboxError();
        return true;
    }
    return false;
}

/**
 * Displays checkbox error message and auto-hides after 3 seconds.
 * @returns {void}
 */
function displayCheckboxError() {
    const errorMessage = document.querySelector('.error-message');
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}

/**
 * Checks if any required fields are empty and validates checkbox state.
 * @param {ContactInputs} inputs - Object containing form input elements
 * @param {ContactValues} values - Object containing trimmed input values
 * @param {boolean} [showErrors=true] - Whether to display error messages
 * @param {boolean} checkboxChecked - Whether privacy checkbox is checked
 * @returns {boolean} True if any fields are empty, false otherwise
 */
function checkEmptyFields(inputs, values, showErrors = true, checkboxChecked) {
    const fieldsEmpty = validateIndividualFields(inputs, values, showErrors);
    const checkboxInvalid = validateCheckboxState(showErrors, checkboxChecked);
    return fieldsEmpty || checkboxInvalid;
}

/**
 * Applies error styling to the name input field.
 * @param {ContactInputs} inputs - Object containing form input elements
 * @returns {void}
 */
function styleNameValues(inputs) {
    inputs.nameInput.classList.add('error');
    const nameIcon = inputs.nameInput.parentElement.querySelector('.inputIcon');
    if (nameIcon) nameIcon.classList.add('visible');
    document.getElementById('namePlaceholderError').innerHTML = "Please enter a name.";
    document.getElementById('namePlaceholderError').classList.add('visible');
    hideErrorMessages('namePlaceholderError', 'contactName');
    hasError = true;
}

/**
 * Applies error styling to the email input field.
 * @param {ContactInputs} inputs - Object containing form input elements
 * @returns {void}
 */
function styleEmailValues(inputs) {
    inputs.emailInput.classList.add('error');
    const emailIcon = inputs.emailInput.parentElement.querySelector('.inputIcon');
    if (emailIcon) emailIcon.classList.add('visible');
    document.getElementById('emailPlaceholderError').innerHTML = "Please enter an e-mail address.";
    document.getElementById('emailPlaceholderError').classList.add('visible');
    hideErrorMessages('emailPlaceholderError', 'contactEmail');
    hasError = true;
}

/**
 * Applies error styling to the message textarea field.
 * @param {ContactInputs} inputs - Object containing form input elements
 * @returns {void}
 */
function styleMessageValues(inputs) {
    inputs.messageInput.classList.add('error');
    const messageIcon = inputs.messageInput.parentElement.querySelector('.inputIcon');
    if (messageIcon) messageIcon.classList.add('visible');
    document.getElementById('messagePlaceholderError').innerHTML = "Please enter a message.";
    document.getElementById('messagePlaceholderError').classList.add('visible');
    hideErrorMessages('messagePlaceholderError', 'contactMessage');
    hasError = true;
}

/**
 * Hides error messages and styling after 3 seconds.
 * @param {string} id - ID of the error message element
 * @param {string} inputId - ID of the input field element
 * @returns {void}
 */
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
            const icon = input.parentElement.querySelector('.inputIcon');
            if (icon) icon.classList.remove('visible');
        }
    }, 3000);
}

/**
 * Validates email format using regex pattern.
 * @param {boolean} [showErrors=true] - Whether to display error messages
 * @returns {Promise<boolean>} True if email is valid, false otherwise
 * @async
 */
async function validateAddEmailFormat(showErrors = true) {
    let emailInput = document.getElementById("contactEmail");
    if (!emailInput) {
        return true;
    }
    let email = emailInput.value.trim().toLowerCase();
    let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let errorMsgEmail = document.getElementById("emailError");
    if (emailInput.value == '') return true;
    if (!pattern.test(email)) {
        if (showErrors) {
            patternTestEmail(emailInput, errorMsgEmail);
        }
        return false;
    }
    if (errorMsgEmail && showErrors) errorMsgEmail.classList.add("dNone");
    return true;
}

/**
 * Validates message length (minimum 10 characters).
 * @param {boolean} [showErrors=true] - Whether to display error messages
 * @returns {Promise<boolean>} True if message is valid, false otherwise
 * @async
 */
async function validateMessageFormat(showErrors = true) {
    let messageInput = document.getElementById("contactMessage");
    let message = messageInput.value.trim();
    let errorMsgMessage = document.getElementById("messageError");
    if (message === '') return true;
    if (message.length < 10) {
        if (showErrors) patternTestMessage(messageInput, errorMsgMessage);
        return false;
    }
    if (errorMsgMessage && showErrors) errorMsgMessage.classList.add("dNone");
    return true;
}

/**
 * Displays email validation error message and styling.
 * @param {HTMLInputElement} emailInput - Email input element
 * @param {HTMLElement} errorMsgEmail - Email error message element
 * @returns {void}
 */
function patternTestEmail(emailInput, errorMsgEmail) {
    emailInput.classList.add("error");
    const emailIcon = emailInput.parentElement.querySelector('.inputIcon');
    if (emailIcon) emailIcon.classList.add('visible');
    errorMsgEmail.innerText = "Please enter a valid email address.";
    errorMsgEmail.classList.remove("dNone");
    setTimeout(() => {
        errorMsgEmail.classList.add("dNone");
        errorMsgEmail.innerText = "";
        emailInput.classList.remove("error");
        if (emailIcon) emailIcon.classList.remove('visible');
    }, 3000);
}

/**
 * Displays message validation error message and styling.
 * @param {HTMLTextAreaElement} messageInput - Message textarea element
 * @param {HTMLElement} errorMsgMessage - Message error message element
 * @returns {void}
 */
function patternTestMessage(messageInput, errorMsgMessage) {
    messageInput.classList.add("error");
    const messageIcon = messageInput.parentElement.querySelector('.inputIcon');
    if (messageIcon) messageIcon.classList.add('visible');
    errorMsgMessage.innerText = "Message must be at least 10 characters long.";
    errorMsgMessage.classList.remove("dNone");
    setTimeout(() => {
        errorMsgMessage.classList.add("dNone");
        errorMsgMessage.innerText = "";
        messageInput.classList.remove("error");
        if (messageIcon) messageIcon.classList.remove('visible');
    }, 3000);
}