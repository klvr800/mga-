// Portfolio Dynamic Effects and Interactions
class PortfolioAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupParticles();
        this.setupSkillBars();
        this.setupTypewriter();
        this.setupContactForm();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
    }

    // Navigation Effects
    setupNavigation() {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        // Add scroll effect to navigation
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Active section highlighting
        const sections = document.querySelectorAll('section[id]');
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        };

        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => navObserver.observe(section));
    }

    // Scroll-triggered animations
    setupScrollAnimations() {
        const animateElements = document.querySelectorAll('section, .card, .project-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Stagger animation for cards
                    if (entry.target.parentElement && entry.target.parentElement.classList.contains('about-grid')) {
                        const cards = entry.target.parentElement.querySelectorAll('.card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.animationDelay = `${index * 0.2}s`;
                                card.classList.add('visible');
                            }, index * 100);
                        });
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        animateElements.forEach(el => observer.observe(el));
    }

    // Floating particles background
    setupParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            this.createParticle(particlesContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and timing
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        container.appendChild(particle);
    }

    // Animated skill bars
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillSection = entry.target;
                    const bars = skillSection.querySelectorAll('.skill-progress');
                    
                    bars.forEach((bar, index) => {
                        setTimeout(() => {
                            const width = bar.parentElement.previousElementSibling.textContent.match(/\d+/)[0];
                            bar.style.width = '0%';
                            setTimeout(() => {
                                bar.style.width = width + '%';
                            }, 100);
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.5 });

        const skillsSection = document.querySelector('#skills');
        if (skillsSection) {
            skillObserver.observe(skillsSection);
        }
    }

    // Typewriter effect for hero section
    setupTypewriter() {
        const subtitle = document.querySelector('.hero .subtitle');
        if (subtitle) {
            const text = subtitle.textContent;
            subtitle.textContent = '';
            
            setTimeout(() => {
                this.typeWriter(subtitle, text, 0, 100);
            }, 1000);
        }
    }

    typeWriter(element, text, index, speed) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            setTimeout(() => this.typeWriter(element, text, index + 1, speed), speed);
        }
    }

    // Contact form handling
    setupContactForm() {
        const form = document.querySelector('#contactForm');
        if (form) {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
            
            // Add focus effects to form inputs
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', (e) => {
                    e.target.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', (e) => {
                    if (!e.target.value) {
                        e.target.parentElement.classList.remove('focused');
                    }
                });
            });
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> إرسال...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showNotification('تم إرسال الرسالة بنجاح! سأتواصل معك قريباً.', 'success');
            form.reset();
            
        } catch (error) {
            this.showNotification('حدث خطأ في الإرسال. حاول مرة أخرى.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 1001;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // Mobile menu toggle
    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuBtn.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
            
            // Close menu when clicking on links
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuBtn.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });
        }
    }

    // Smooth scrolling for anchor links
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Additional interactive effects
class InteractiveEffects {
    constructor() {
        this.setupHoverEffects();
        this.setupCursorEffects();
        this.setupScrollProgress();
    }

    setupHoverEffects() {
        // 3D tilt effect for cards
        const cards = document.querySelectorAll('.card, .project-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    setupCursorEffects() {
        // Custom cursor for interactive elements
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(37, 99, 235, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: all 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        // Expand cursor on hover over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .card, .skill-progress');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.background = 'rgba(34, 211, 238, 0.6)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.background = 'rgba(37, 99, 235, 0.8)';
            });
        });
    }

    setupScrollProgress() {
        // Scroll progress indicator
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #2563eb, #22d3ee);
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
}

// Parallax scrolling effects
class ParallaxEffects {
    constructor() {
        this.setupParallax();
    }

    setupParallax() {
        const parallaxElements = document.querySelectorAll('.hero, .about, .experience');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach((el, index) => {
                const speed = 0.2 + (index * 0.1);
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// Performance optimized animations
class OptimizedAnimations {
    constructor() {
        this.rafId = null;
        this.setupPerformanceOptimization();
    }

    setupPerformanceOptimization() {
        // Reduce animations on low-end devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
            document.body.classList.add('reduced-motion');
        }

        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                document.body.classList.add('paused-animations');
            } else {
                document.body.classList.remove('paused-animations');
            }
        });
    }
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimations();
    new InteractiveEffects();
    new ParallaxEffects();
    new OptimizedAnimations();
});

// Additional utility functions
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Animate number counting
    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const range = end - start;

        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (range * progress));
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
};

// Export utils for global use
window.portfolioUtils = utils;