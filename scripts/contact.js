/**
 * @typedef {Object} EmailConfig
 * @property {string} serviceId - EmailJS service ID
 * @property {string} templateId - EmailJS template ID
 * @property {string} publicKey - EmailJS public key
 */

/**
 * Configuration object for EmailJS integration.
 * @type {EmailConfig}
 * @constant
 */
const EMAIL_CONFIG = {
    serviceId: 'service_vet94ip',
    templateId: 'template_h8anrii',
    publicKey: 'FjqmytnRfRDnz8Rhd'
};

/**
 * Flag indicating if the form is valid (all fields pass validation).
 * @type {boolean}
 * @default false
 */
let isFormValid = false;

/**
 * Flag indicating if the privacy policy checkbox is checked.
 * @type {boolean}
 * @default false
 */
let checkboxChecked = false;

/**
 * Initializes the EmailJS library with the public key from configuration.
 * @returns {void}
 */
function initEmailJS() {
    emailjs.init(EMAIL_CONFIG.publicKey);
}

/**
 * Enables or disables the send message button based on form validation state.
 * @returns {void}
 */
function enableMsgButton() {
    let sendMessageButton = document.getElementById("sendMessageButton");
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    const allFieldsFilled = name !== '' && email !== '' && message !== '';
    const allValid = checkboxChecked && isFormValid && allFieldsFilled;
    sendMessageButton.disabled = !allValid;
    sendMessageButton.classList.toggle("checkedButton", allValid);
}

/**
 * Initializes the contact form by setting up EmailJS and event listeners.
 * @returns {void}
 */
function initContactForm() {
    initEmailJS();
    const sendButton = document.getElementById('sendMessageButton');
    const checkboxContainer = document.getElementById('checkbox');
    sendButton.addEventListener('click', handleFormSubmit);
    checkboxContainer.addEventListener('click', toggleCheckbox);

    // ✅ Input Events - Validierung + Error-Removal während des Tippens
    document.getElementById('contactName').addEventListener('input', validateFormRealTime);
    document.getElementById('contactEmail').addEventListener('input', handleEmailInput);
    document.getElementById('contactMessage').addEventListener('input', handleMessageInput);

    // Blur Events - Validierung beim Verlassen des Feldes
    document.getElementById('contactName').addEventListener('blur', validateSingleField);
    document.getElementById('contactEmail').addEventListener('blur', validateSingleField);
    document.getElementById('contactMessage').addEventListener('blur', validateSingleField);
}

/**
 * Toggles the privacy policy checkbox state.
 * @returns {void}
 */
function toggleCheckbox() {
    checkboxChecked = !checkboxChecked;
    const checkboxContainer = document.getElementById('checkbox');
    checkboxContainer.classList.toggle('checked', checkboxChecked);
    enableMsgButton();
}

/**
 * Validates the form in real-time as the user types.
 * @returns {Promise<void>}
 * @async
 */
async function validateFormRealTime() {
    const isValid = await validateContactInput(false, checkboxChecked);
    isFormValid = isValid;
    enableMsgButton();
}

/**
 * Sets the send button to loading state.
 * @param {HTMLButtonElement} button - The send button element
 * @returns {string} The original button text
 */
function setButtonLoading(button) {
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = 'Sending...';
    button.classList.add('loading');
    return originalText;
}

/**
 * Resets the send button to its original state.
 * @param {HTMLButtonElement} button - The send button element
 * @param {string} originalText - The original button text
 * @returns {void}
 */
function resetButtonState(button, originalText) {
    button.disabled = false;
    button.innerHTML = originalText;
    button.classList.remove('loading');
    enableMsgButton();
}

/**
 * Processes the form submission after validation passes.
 * @returns {Promise<void>}
 * @async
 */
async function processFormSubmission() {
    const success = await sendContactForm();
    if (success) {
        showSuccessMessage();
        resetForm();
    } else {
        showErrorMessage('Failed to send message. Please try again.');
    }
}

/**
 * Handles the form submission process.
 * @param {Event} event - The click event from the submit button
 * @returns {Promise<void>}
 * @async
 */
async function handleFormSubmit(event) {
    event.preventDefault();
    const sendButton = document.getElementById('sendMessageButton');
    const originalText = setButtonLoading(sendButton);
    try {
        const isValid = await validateContactInput(true, checkboxChecked);
        if (isValid) {
            await processFormSubmission();
        }
    } catch (error) {
        console.error('Error sending form:', error);
        showErrorMessage('An error occurred. Please try again.');
    } finally {
        resetButtonState(sendButton, originalText);
    }
}

/**
 * Validates a single field when it loses focus (blur event).
 * @param {FocusEvent} event - The blur event from the input field
 * @returns {Promise<void>}
 * @async
 */
async function validateSingleField(event) {
    const fieldId = event.target.id;
    const input = event.target;
    if (input.value.trim() === '') {
        await validateFormRealTime();
        return;
    }
    if (fieldId === 'contactEmail') {
        await validateAddEmailFormat(true);
    } else if (fieldId === 'contactMessage') {
        await validateMessageFormat(true);
    }
    await validateFormRealTime();
}

/**
 * Handles email input events and removes error styling when user starts typing.
 * @returns {Promise<void>}
 * @async
 */
async function handleEmailInput() {
    const emailInput = document.getElementById('contactEmail');
    const emailError = document.getElementById('emailError');
    const emailIcon = emailInput.parentElement.querySelector('.inputIcon');
    if (emailInput.value.trim() !== '') {
        emailInput.classList.remove('error');
        if (emailIcon) emailIcon.classList.remove('visible');
        if (emailError) emailError.classList.add('contactdNone');
    }
    await validateFormRealTime();
}

/**
 * Handles message input events and removes error styling when user starts typing.
 * @returns {Promise<void>}
 * @async
 */
async function handleMessageInput() {
    const messageInput = document.getElementById('contactMessage');
    const messageError = document.getElementById('messageError');
    const messageIcon = messageInput.parentElement.querySelector('.inputIcon');
    if (messageInput.value.trim() !== '') {
        messageInput.classList.remove('error');
        if (messageIcon) messageIcon.classList.remove('visible');
        if (messageError) messageError.classList.add('contactdNone');
    }
    await validateFormRealTime();
}

/**
 * @typedef {Object} EmailTemplateParams
 * @property {string} from_name - Sender's name
 * @property {string} from_email - Sender's email address
 * @property {string} message - Email message content
 * @property {string} to_email - Recipient's email address
 */

/**
 * Gathers form data and creates template parameters for EmailJS.
 * @returns {EmailTemplateParams} Object containing email template parameters
 */
function getEmailTemplateParams() {
    return {
        from_name: document.getElementById('contactName').value.trim(),
        from_email: document.getElementById('contactEmail').value.trim(),
        message: document.getElementById('contactMessage').value.trim(),
        to_email: 'oli.geschine@web.de'
    };
}

/**
 * Sends email using EmailJS service.
 * @param {EmailTemplateParams} templateParams - Email template parameters
 * @returns {Promise<Object>} EmailJS response object
 * @async
 * @throws {Error} If EmailJS service fails
 */
async function sendEmailViaService(templateParams) {
    return await emailjs.send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId,
        templateParams
    );
}

/**
 * Sends the contact form data via EmailJS.
 * @returns {Promise<boolean>} True if email was sent successfully, false otherwise
 * @async
 */
async function sendContactForm() {
    try {
        const templateParams = getEmailTemplateParams();
        const response = await sendEmailViaService(templateParams);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Displays a success message after email is sent.
 * @returns {void}
 */
function showSuccessMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.innerHTML = '✓ Message sent successfully!';
    const contactSection = document.getElementById('sendMessageButton').parentElement;
    contactSection.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
}

/**
 * Displays an error message when email sending fails.
 * @param {string} message - The error message to display
 * @returns {void}
 */
function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-message-popup';
    messageDiv.innerHTML = `✗ ${message}`;
    const contactSection = document.getElementById('contact');
    contactSection.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 5000);
}

/**
 * Resets the contact form to its initial state.
 * @returns {void}
 */
function resetForm() {
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactMessage').value = '';
    checkboxChecked = false;
    document.getElementById('checkbox').classList.remove('checked');
    isFormValid = false;
    enableMsgButton();
    document.querySelectorAll('.inputIcon').forEach(icon => {
        icon.classList.remove('visible');
    });
}