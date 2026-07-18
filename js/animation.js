document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 120
        });
    }

    // Initialize Vanilla Tilt
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 12,
            speed: 400,
            glare: true,
            "max-glare": 0.4
        });
    }

    // Initialize PureCounter for Stats
    if (typeof new PureCounter === 'function') {
        new PureCounter({
            selector: '.purecounter',
            start: 0,
            duration: 2,
            once: true,
            delay: 10
        });
    }
});
