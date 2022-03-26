const accordions = document.getElementsByClassName('accordion-button');

Array.from(accordions).forEach(accordion => {
    accordion.onclick = () => {
        accordion.classList.toggle('is-open');

        const content = accordion.nextElementSibling;

        content.style.maxHeight ? content.style.maxHeight = null : content.style.maxHeight = content.scrollHeight + "px";
    }
});