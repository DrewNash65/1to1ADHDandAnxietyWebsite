// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation to elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .feature, .pricing-card, .payment-option, .step-card, .support-option');
    animatedElements.forEach(el => observer.observe(el));
});

// Active navigation highlighting
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveNavigation);

// Form validation (for future forms)
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;

    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');

            // Remove error class on input
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('error');
                }
            });
        }
    });

    return isValid;
}

// Add loading state to buttons
function addLoadingState(button, originalText) {
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';

    // Store original text for restoration
    button.dataset.originalText = originalText || button.textContent;
}

function removeLoadingState(button) {
    button.disabled = false;
    button.innerHTML = button.dataset.originalText || 'Submit';
}

// Phone number formatting
function formatPhoneNumber(input) {
    let phoneNumber = input.value.replace(/\D/g, '');

    if (phoneNumber.length >= 6) {
        phoneNumber = `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3,6)}-${phoneNumber.slice(6,10)}`;
    } else if (phoneNumber.length >= 3) {
        phoneNumber = `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3)}`;
    }

    input.value = phoneNumber;
}

// Date validation - ensure appointments are not in the past
function validateDate(input) {
    const selectedDate = new Date(input.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        input.setCustomValidity('Please select a future date');
        return false;
    }

    input.setCustomValidity('');
    return true;
}

// File upload validation
function validateFileUpload(input, maxSizeMB = 10, allowedTypes = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png']) {
    const files = input.files;

    for (let file of files) {
        // Check file size
        if (file.size > maxSizeMB * 1024 * 1024) {
            alert(`File ${file.name} is too large. Maximum size is ${maxSizeMB}MB.`);
            input.value = '';
            return false;
        }

        // Check file type
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!allowedTypes.includes(fileExtension)) {
            alert(`File ${file.name} is not an allowed type. Allowed types: ${allowedTypes.join(', ')}.`);
            input.value = '';
            return false;
        }
    }

    return true;
}

// Cookie consent (if needed later)
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Analytics and event tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    // This would be replaced with actual analytics code
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Search functionality (if needed later)
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (!searchInput) return;

    searchInput.addEventListener('input', debounce(function(e) {
        const query = e.target.value.toLowerCase();

        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        // Perform search logic here
        console.log('Searching for:', query);
    }, 300));
}

// Print functionality
function printPage() {
    window.print();
}

// Email obfuscation to prevent spam
function obfuscateEmail(email) {
    return email.replace(/@/g, ' [at] ').replace(/\./g, ' [dot] ');
}

// Accessibility improvements
function initializeAccessibility() {
    // Add keyboard navigation for dropdown menus
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open menus/modals
            const activeMenu = document.querySelector('.dropdown.active, .modal.active');
            if (activeMenu) {
                activeMenu.classList.remove('active');
            }
        }
    });

    // Add ARIA live regions for dynamic content
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeAccessibility();
    setActiveNavigation();
    initializePatientInquiryForm();

    // Add smooth reveal animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('fade-in');
        }, 100);
    }
});

// Patient Inquiry Form Handler
function initializePatientInquiryForm() {
    const form = document.getElementById('patientInquiryForm');
    if (!form) return;

    // Handle "How did you hear about us?" dropdown
    const referralSource = document.getElementById('referralSource');
    const otherReferralGroup = document.getElementById('otherReferralGroup');
    const otherReferral = document.getElementById('otherReferral');

    if (referralSource && otherReferralGroup && otherReferral) {
        referralSource.addEventListener('change', function() {
            if (this.value === 'Other') {
                otherReferralGroup.style.display = 'block';
                otherReferral.required = true;
            } else {
                otherReferralGroup.style.display = 'none';
                otherReferral.required = false;
                otherReferral.value = '';
            }
        });
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const formMessage = document.getElementById('formMessage');

        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';

        // Hide any previous messages
        formMessage.style.display = 'none';
        formMessage.className = 'form-message';

        try {
            const formData = new FormData(form);
            const inquiryData = {
                parentName: formData.get('parentName'),
                phoneNumber: formData.get('phoneNumber'),
                email: formData.get('email'),
                patientName: formData.get('patientName'),
                dateOfBirth: formData.get('dateOfBirth'),
                referralSource: formData.get('referralSource'),
                otherReferral: formData.get('otherReferral'),
                concerns: formData.get('concerns'),
                submittedAt: new Date().toISOString()
            };

            // Validate required fields
            if (!inquiryData.parentName || !inquiryData.phoneNumber || !inquiryData.email ||
                !inquiryData.patientName || !inquiryData.dateOfBirth || !inquiryData.referralSource ||
                !inquiryData.concerns || (inquiryData.referralSource === 'Other' && !inquiryData.otherReferral)) {
                throw new Error('Please fill in all required fields.');
            }

            // Send email via Resend (this would need your Resend API key and backend)
            await sendPatientInquiry(inquiryData);

            // Show success message
            formMessage.innerHTML = `
                <strong>Thank you for your inquiry!</strong><br>
                We've received your information and will contact you within 24-48 hours to schedule your consultation for our Early January 2026 launch.
            `;
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';

            // Reset form
            form.reset();

        } catch (error) {
            console.error('Form submission error:', error);

            // Show error message
            formMessage.innerHTML = `
                <strong>Submission Error</strong><br>
                ${error.message || 'There was an error submitting your inquiry. Please try again or contact us directly at ADHD@1to1Pediatrics.com'}
            `;
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    });
}

// Send patient inquiry via Resend API
async function sendPatientInquiry(data) {
    const response = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send inquiry');
    }

    return response.json();
}

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Handle window resize events
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
}, 250));

// Performance optimization - lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

document.addEventListener('DOMContentLoaded', initializeLazyLoading);