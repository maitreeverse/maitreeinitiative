// Page Loader
window.addEventListener('load', function() {
    const loader = document.getElementById('pageLoader');
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobileMenu');
const navMenu = document.getElementById('navMenu');

mobileMenu.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    const icon = mobileMenu.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenu.querySelector('i');
        icon.classList.replace('fa-times', 'fa-bars');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Create mailto link
    const subject = `Message from ${name} - Maitree Contact Form`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:maitreeinitiative@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Thank you for your message! Your email client should open with the pre-filled message.');
    
    // Reset form
    this.reset();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.program-card, .stat-card, .involvement-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for impact stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 50 ? '+' : target === 5 ? '+' : target === 1 ? '' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 50 ? '+' : target === 5 ? '+' : target === 1 ? '' : '');
        }
    }, 20);
}

// Trigger counter animation when impact section is visible
const impactObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const text = counter.textContent;
                if (text.includes('50+')) {
                    animateCounter(counter, 50);
                } else if (text.includes('5+')) {
                    animateCounter(counter, 5);
                } else if (text === '1') {
                    counter.textContent = '1';
                } else if (text === 'Weekly') {
                    // Keep as is
                }
            });
            impactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const impactSection = document.getElementById('impact');
    if (impactSection) {
        impactObserver.observe(impactSection);
    }
});

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroHeight = hero.offsetHeight;
    
    if (scrolled < heroHeight) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add active navigation highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Image Slider for Programs Section
let currentSlide = 0;
let sliderInterval;

function initializeSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slider-image');
    
    if (!sliderContainer || slides.length === 0) {
        return;
    }
    
    // Clear any existing interval
    if (sliderInterval) {
        clearInterval(sliderInterval);
    }
    
    function moveToSlide(slideIndex) {
        const slideWidth = 100 / slides.length;
        const translateX = -(slideIndex * slideWidth);
        sliderContainer.style.transform = `translateX(${translateX}%)`;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        moveToSlide(currentSlide);
    }
    
    // Initialize to first slide
    moveToSlide(currentSlide);
    
    // Set interval with single instance
    sliderInterval = setInterval(nextSlide, 4000);
    
    // Pause on hover
    const sliderWrapper = document.querySelector('.program-image-slider');
    if (sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', () => {
            clearInterval(sliderInterval);
        });
        sliderWrapper.addEventListener('mouseleave', () => {
            sliderInterval = setInterval(nextSlide, 4000);
        });
    }
    
    // Reset on resize
    window.addEventListener('resize', () => {
        moveToSlide(currentSlide);
    }, { passive: true });
}

// Initialize slider once on DOM content loaded
document.addEventListener('DOMContentLoaded', initializeSlider);
