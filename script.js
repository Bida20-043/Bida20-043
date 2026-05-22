document.addEventListener('DOMContentLoaded', () => {
    // === Mobile Menu Toggle ===
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileBtn && mainNav) {
        mobileBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Toggle icon
            if (mainNav.classList.contains('active')) {
                mobileBtn.innerHTML = '✕';
            } else {
                mobileBtn.innerHTML = '☰';
            }
        });
    }

    // === Highlight Active Nav Link ===
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // === Form Validation (Contact Page) ===
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default submission for demonstration
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            // Reset errors
            document.querySelectorAll('.form-group').forEach(group => group.classList.remove('error'));

            // Name validation
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            }

            // Message validation
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message cannot be empty');
                isValid = false;
            }

            if (isValid) {
                // Animate button on success
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalText = submitBtn.value;
                submitBtn.value = 'Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.value = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        let errorEl = formGroup.querySelector('.error-message');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'error-message';
            formGroup.appendChild(errorEl);
        }
        errorEl.textContent = message;
    }

    // === Scroll Animations (Intersection Observer) ===
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If it's a section, trigger the animation by resetting animation
                entry.target.style.animation = 'none';
                entry.target.offsetHeight; /* trigger reflow */
                entry.target.style.animation = null;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, article.card').forEach(el => {
        observer.observe(el);
    });
});
