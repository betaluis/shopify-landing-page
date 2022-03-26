const body = document.getElementsByTagName('body')[0];
const overlay = document.querySelector('.sign-up');
const close = document.querySelector('.close-icon');
const buttons = document.getElementsByClassName('free-trial-button');
const submit = document.querySelector('.submit-button');

// Collect email data from first form on landing page.
const getData = (formClass) => {
    return Array.from(document.querySelectorAll(formClass)).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});
}

const overlayEmailInput = document.querySelector('.overlay-form')[0];

Array.from(buttons).forEach(button => {
    button.onclick = () => {
        overlay.classList.add('js-open-sign-up');
        body.classList.add('no-scroll');

        // Get email if typed in on landing page.
        const email = getData('.email-form input').landingEmail;
        email ? overlayEmailInput.value = email : overlayEmailInput.value = null;
    }
});

close.onclick = () => { 
    overlay.classList.remove('js-open-sign-up'); 
    body.classList.remove('no-scroll');
}

// Check validity of password input
const passwordInput = document.querySelector('#password');
const passwordErrorElement = document.querySelector('.password-error-message');

passwordInput.addEventListener('focusout', () => {

    // Custom input conditionals (between 6 and 18 characters, and no spaces). If not met, the following styles are intiated to the passwordErrorElement. 
    if (passwordInput.value.length >= 1 && passwordInput.value.length <= 6 || passwordInput.value.length >= 18 || passwordInput.value.indexOf(' ') >= 0) {
        passwordInput.classList.add('error-shadow');
        passwordErrorElement.style.height = 40 + 'px';
        passwordErrorElement.style.opacity = 1;
        passwordErrorElement.style.padding = 10 + 'px';

        // Error message that is displayed inside the element based on the error
        passwordInput.value.length >= 1 && passwordInput.value.length <= 6 ? passwordErrorElement.innerHTML = 'Password must be longer than 6 characters' :  
            passwordInput.value.indexOf(' ') >= 0 ? passwordErrorElement.innerHTML = "Password cannot contain spaces" :
            passwordErrorElement.innerHTML = 'Password must be shorter than 18 characters';

        submit.disabled = true;
    }

    // If the conditions are met when refocused on the input element, then error styles will be reversed.
    if (passwordInput.value.length > 6 && passwordInput.value.length < 18 || passwordInput.value.length == 0) {
        if (passwordInput.value.indexOf(' ') <= 0) {
            if (passwordInput.classList.contains('error-shadow')) {
                passwordInput.classList.remove('error-shadow');
                passwordErrorElement.style.height = 0 + 'px';
                passwordErrorElement.style.opacity = 0;
                passwordErrorElement.style.padding = 0;
            }

            submit.disabled = false;
        }
    } 
});
