document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Tab-based navigation: show/hide sections instead of scrolling
    const showSection = (sectionId) => {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.style.display = 'block';
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 10);
            } else {
                section.style.display = 'none';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Show home section by default
    showSection('home');

    // Animate skill bars when section is shown
    const animateSkills = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible && bar.style.width === '0px') {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = `${progress}%`;
            }
        });
    };

    // Fade in animations for elements within visible sections
    const fadeElements = document.querySelectorAll(
        '.detail-item, .timeline-item, .skill-card, .education-item, .contact-item'
    );
    fadeElements.forEach(el => el.classList.add('fade-in'));

    const fadeInOnScroll = () => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            if (isVisible) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', () => {
        animateSkills();
        fadeInOnScroll();
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalContent = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
                btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Typing effect for hero title
    const titleElement = document.querySelector('.title');
    if (titleElement) {
        const text = titleElement.textContent;
        titleElement.textContent = '';
        let index = 0;

        const typeWriter = () => {
            if (index < text.length) {
                titleElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 80);
            }
        };

        setTimeout(typeWriter, 1200);
    }
});