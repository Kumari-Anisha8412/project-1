/**
 * ANISHA KUMARI - WEB PORTFOLIO & DIGITAL SOLUTIONS
 * Interactive JavaScript Logic: Navigation, Theme Toggle, ScrollSpy, Forms & UI
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. DOM Elements Cache
    // -------------------------------------------------------------------------
    const navbarWrapper = document.getElementById('navbar-wrapper');
    const scrollProgressBar = document.getElementById('scroll-progress');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const closeMobileMenuBtn = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('back-to-top');
    const contactForm = document.getElementById('contact-form');
    const formSuccessAlert = document.getElementById('form-success');
    const submitBtn = document.getElementById('submit-btn');

    // -------------------------------------------------------------------------
    // 2. Dark / Light Theme Toggle
    // -------------------------------------------------------------------------
    const savedTheme = localStorage.getItem('nexus_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('nexus_theme', newTheme);
        });
    }

    // -------------------------------------------------------------------------
    // 3. Mobile Drawer Menu Navigation
    // -------------------------------------------------------------------------
    function openMobileMenu() {
        if (mobileMenu && mobileOverlay && mobileToggleBtn) {
            mobileMenu.classList.add('active');
            mobileOverlay.classList.add('active');
            mobileToggleBtn.classList.add('active');
            mobileToggleBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMobileMenu() {
        if (mobileMenu && mobileOverlay && mobileToggleBtn) {
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            mobileToggleBtn.classList.remove('active');
            mobileToggleBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }

    if (mobileToggleBtn) {
        mobileToggleBtn.addEventListener('click', () => {
            const isOpen = mobileMenu && mobileMenu.classList.contains('active');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (closeMobileMenuBtn) {
        closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // -------------------------------------------------------------------------
    // 4. Scroll Management (Navbar state, Progress bar, Back to top, ScrollSpy)
    // -------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');

    function handleScroll() {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Scroll Progress Bar
        if (scrollProgressBar && docHeight > 0) {
            const progressPercent = Math.min((scrollY / docHeight) * 100, 100);
            scrollProgressBar.style.width = `${progressPercent}%`;
        }

        // Navbar blur on scroll
        if (navbarWrapper) {
            if (scrollY > 50) {
                navbarWrapper.classList.add('scrolled');
            } else {
                navbarWrapper.classList.remove('scrolled');
            }
        }

        // Back to Top Button
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }

        // ScrollSpy (Active link indicator)
        const scrollPosition = scrollY + 180;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });

                mobileLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger initial state

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // -------------------------------------------------------------------------
    // 5. Contact Form Validation & Submission
    // -------------------------------------------------------------------------
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('contact-name');
            const emailInput = document.getElementById('contact-email');
            const messageInput = document.getElementById('contact-message');

            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const messageError = document.getElementById('message-error');

            let isValid = true;

            // Clear previous errors
            if (nameError) nameError.textContent = '';
            if (emailError) emailError.textContent = '';
            if (messageError) messageError.textContent = '';

            // Validate Name
            if (!nameInput.value.trim()) {
                if (nameError) nameError.textContent = 'Please enter your name.';
                isValid = false;
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                if (emailError) emailError.textContent = 'Please enter your email address.';
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                if (emailError) emailError.textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            // Validate Message
            if (!messageInput.value.trim()) {
                if (messageError) messageError.textContent = 'Please describe your project or request.';
                isValid = false;
            }

            if (!isValid) return;

            // Show loading animation on button
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }

            // Simulate sending message to Anisha Kumari (anisha84121@gmail.com)
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }

                if (formSuccessAlert) {
                    formSuccessAlert.classList.add('show');
                    contactForm.reset();

                    // Auto-hide success alert after 6 seconds
                    setTimeout(() => {
                        formSuccessAlert.classList.remove('show');
                    }, 6000);
                }
            }, 1200);
        });
    }

    // -------------------------------------------------------------------------
    // 6. Smooth scrolling for internal anchor links
    // -------------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});