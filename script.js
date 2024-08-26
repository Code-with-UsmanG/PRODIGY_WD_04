document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');

    document.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - navbar.offsetHeight,
                behavior: 'smooth'
            });
        });
    });

    const fadeInElements = document.querySelectorAll('.project, .testimonial, h1');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });

    fadeInElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // New code for headline animation
    const headlines = [
        "Welcome to My Professional Portfolio!",
        "I am",
        "Developer!",
        "Project Manager!",
        "Data Analyst!",
        "Responsive Web Developer(Front-end)!",
        "C++ Programmer!"
    ];
    const headlineElement = document.getElementById('headline');
    let index = 0;

    function typeHeadline(text, callback) {
        let i = 0;
        headlineElement.innerHTML = '';
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                headlineElement.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    if (callback) callback();
                }, 1000); // Pause before erasing
            }
        }, 100); // Speed of typing
    }

    function eraseHeadline(callback) {
        let text = headlineElement.innerHTML;
        let i = text.length;
        const erasingInterval = setInterval(() => {
            if (i > 0) {
                headlineElement.innerHTML = text.substring(0, i - 1);
                i--;
            } else {
                clearInterval(erasingInterval);
                setTimeout(() => {
                    if (callback) callback();
                }, 500); // Pause before starting new headline
            }
        }, 50); // Speed of erasing
    }

    function startAnimation() {
        typeHeadline(headlines[index], () => {
            eraseHeadline(() => {
                index = (index + 1) % headlines.length;
                startAnimation();
            });
        });
    }

    startAnimation();
});
