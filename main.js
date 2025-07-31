// Smooth scrolling for navigation links
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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Reveal animations on scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal-up');

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Initial check for elements in viewport
document.addEventListener('DOMContentLoaded', function() {
    revealOnScroll();

    // Animate hero content on load
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 100);
});

// Portfolio tab switching with animation
document.querySelectorAll('#portfolioTabs .nav-link').forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs
        document.querySelectorAll('#portfolioTabs .nav-link').forEach(t => {
            t.classList.remove('active');
        });

        // Add active class to clicked tab
        this.classList.add('active');
        
        // Hide all tab panes
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('show', 'active');
        });
        
        // Show target tab pane with animation
        const target = document.querySelector(this.getAttribute('data-bs-target'));
        if (target) {
            setTimeout(() => {
                target.classList.add('show', 'active');
                
                // Trigger reveal animation for portfolio items
                const portfolioItems = target.querySelectorAll('.portfolio-item');
                portfolioItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }, 50);
        }
    });
});

// Portfolio item hover effects
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Service card animation
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';

        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1.15) rotate(10deg)';
        }
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Button click animations
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Navbar collapse on mobile when link is clicked
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const navbarToggler = document.querySelector('.navbar-toggler');
            navbarToggler.click();
        }
    });
});

// Counter animation for stats (if you want to add stats section later)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Scroll progress indicator (optional)
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // You can use this to show a progress bar if needed
    document.documentElement.style.setProperty('--scroll-progress', scrollPercent + '%');
}

window.addEventListener('scroll', updateScrollProgress);

// Form validation and submission (if you add a contact form)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    });

    return isValid;
}

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal-up').forEach(el => {
    observer.observe(el);
});

// Preload critical images
function preloadImages() {
    const images = [
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);

// Enhanced Full-Screen Lightbox Gallery with Multiple Images
class FullScreenLightboxGallery {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightboxImage');
        this.lightboxTitle = document.getElementById('lightboxTitle');
        this.lightboxSubtitle = document.getElementById('lightboxSubtitle');
        this.lightboxButtons = document.getElementById('lightboxButtons');
        this.lightboxCounter = document.getElementById('lightboxCounter');
        this.lightboxThumbnails = document.getElementById('lightboxThumbnails');
        this.lightboxClose = document.getElementById('lightboxClose');
        this.lightboxPrev = document.getElementById('lightboxPrev');
        this.lightboxNext = document.getElementById('lightboxNext');

        this.currentProjectIndex = 0;
        this.currentImageIndex = 0;
        this.currentProject = null;

        // Portfolio data with multiple images per project
        this.portfolioData = {
            'web-dev': [
                {
                    title: 'Lashility',
                    subtitle: 'Lash Salon Website',
                    description: 'A modern, responsive website built with WordPress and Elementor. Features online booking system, service showcase, and customer testimonials. Optimized for mobile devices and search engines.',
                    images: [
                        './portfolio/lashility-portfolio.png',
                        './portfolio/lashility-portfolio1.png',
                        './portfolio/lashility-portfolio2.png',
                        
                    ],
                    liveUrl: 'https://lashility.com/',
                },
                {
                    title: 'The HairTric',
                    subtitle: 'Professional Business Presence',
                    description: 'Professional corporate website with custom CMS, multi-language support, and advanced SEO optimization. Built using modern web technologies with focus on performance and user experience.',
                    images: [
                        './portfolio/thehairtric-portfolio.png',
                        './portfolio/thehairtric-portfolio1.png',
                        './portfolio/thehairtric-portfolio2.png',
                        './portfolio/thehairtric-portfolio3.png'
                    ],
                    liveUrl: 'https://thehairtric.com/',
                },
                {
                    title: 'Jantzen',
                    subtitle: 'Water Bottle Company',
                    description: 'Creative portfolio showcase with interactive galleries, smooth animations, and responsive design. Features dynamic content loading and social media integration.',
                    images: [
                        './portfolio/jantzen-portfolio.png',
                        './portfolio/jantzen-portfolio1.png',
                        './portfolio/jantzen-portfolio2.png',
                        './portfolio/jantzen-portfolio3.png',

                    ],
                    liveUrl: 'https://www.jantzen.com.my/',
                },
                {
                    title: 'Al-Mas',
                    subtitle: 'Water Bottle Company',
                    description: 'Creative portfolio showcase with interactive galleries, smooth animations, and responsive design. Features dynamic content loading and social media integration.',
                    images: [
                        './portfolio/almas-portfolio.png',
                        './portfolio/almas-portfolio1.png',

                    ],
                    liveUrl: 'https://almasmalaysia.com/',
                },
                 {
                    title: 'E-Invoicing',
                    subtitle: 'E-invoice',
                    description: 'Creative portfolio showcase with interactive galleries, smooth animations, and responsive design. Features dynamic content loading and social media integration.',
                    images: [
                        './portfolio/einv.PNG',
                        './portfolio/einv1.PNG',
                        './portfolio/einv2.PNG',

                    ],
                    liveUrl: 'https://einv.com.my/',
                }
            ],
            'digital-marketing': [
                {
                    title: 'Marketing Dashboard',
                    subtitle: '360° Digital Marketing',
                    description: '360° digital marketing campaign that increased brand awareness by 400% and generated 250% ROI. Included social media strategy, content marketing, and influencer partnerships.',
                    images: [
                        './portfolio/marketing.png',
                        './portfolio/marketing2.png',
                        './portfolio/marketing3.png',
                    ],
                    caseStudyUrl: 'https://muhammadluqman-99.github.io/dm-dashboard/',
                    resultsUrl: 'https://muhammadluqman-99.github.io/dm-dashboard/'
                },
                {
                    title: 'Marketing Dashboard (Tiktok)',
                    subtitle: '360° Digital Marketing',
                    description: '360° digital marketing campaign that increased brand awareness by 400% and generated 250% ROI. Included social media strategy, content marketing, and influencer partnerships.',
                    images: [
                        './portfolio/marketing4-tiktok.png',
                        './portfolio/marketing5-tiktok1.png',
                        './portfolio/marketing7-tiktok32.png',
                    ],
                   
                },
                {
                    title: 'Marketing Dashboard (Shopee)',
                    subtitle: '360° Digital Marketing',
                    description: '360° digital marketing campaign that increased brand awareness by 400% and generated 250% ROI. Included social media strategy, content marketing, and influencer partnerships.',
                    images: [
                        './portfolio/marketing6-shopee.png',
                        './portfolio/marketing8-shopee1.png',
                    ],
                   
                },
                {
                    title: 'Marketing Dashboard (Facebook)',
                    subtitle: '360° Digital Marketing',
                    description: '360° digital marketing campaign that increased brand awareness by 400% and generated 250% ROI. Included social media strategy, content marketing, and influencer partnerships.',
                    images: [
                        './portfolio/marketing9.jpg',
                        './portfolio/marketing10.jpg',
                    ],
                   
                },
                
            ],
            'software': [
                {
                    title: 'Eform System',
                    subtitle: 'Custom Eform Management',
                    description: 'Custom customer relationship management system with advanced analytics, automated workflows, and integration capabilities. Improved client management efficiency by 60%.',
                    images: [
                        './portfolio/eform-portfolio.png',
                        './portfolio/eform-portfolio1.png',
                        './portfolio/eform-portfolio2.png',
                        './portfolio/eform-portfolio3.png',
                        './portfolio/eform-portfolio4.png',
                        './portfolio/eform-portfolio5.png',
                        './portfolio/eform-portfolio6.png',
                        './portfolio/eform-portfolio7.png'
                    ],
                    githubUrl: 'https://github.com/website-f/Eform'
                },
                {
                    title: 'Sponsorship CRM System',
                    subtitle: 'Real-time sponsorship Tracking Solution',
                    description: 'Real-time inventory tracking system with barcode scanning, automated reordering, and comprehensive reporting. Reduced inventory costs by 25% and improved accuracy.',
                    images: [
                        './portfolio/sponsorship-portfolio.png',
                        './portfolio/sponsorship-portfolio1.png',
                        './portfolio/sponsorship-portfolio2.png',
                        './portfolio/sponsorship-portfolio3.png',
                        './portfolio/sponsorship-portfolio4.png',
                        './portfolio/sponsorship-portfolio5.png'
                    ],
                    githubUrl: 'https://github.com/website-f/jantzen-sponsorship'
                },
                {
                    title: 'Bestspot.ai',
                    subtitle: 'Real-time places Tracking Solution',
                    description: 'Real-time inventory tracking system with barcode scanning, automated reordering, and comprehensive reporting. Reduced inventory costs by 25% and improved accuracy.',
                    images: [
                        './portfolio/bestspot.PNG',
                        './portfolio/bestspot1.PNG',
                        './portfolio/bestspot2.PNG',
                        './portfolio/bestspot3.PNG',
  
                    ],
                    demoUrl: 'https://bestspot.ai/',
                },
                {
                    title: 'Gomeeting',
                    subtitle: 'URL Shorterner',
                    description: 'Real-time inventory tracking system with barcode scanning, automated reordering, and comprehensive reporting. Reduced inventory costs by 25% and improved accuracy.',
                    images: [
                        './portfolio/gomeeting.png',
                        './portfolio/gomeeting1.png',
                        './portfolio/gomeeting2.png',

  
                    ],
                    demoUrl: 'https://gomeeting.link/',
                },
                {
                    title: 'AirTap',
                    subtitle: 'NFC Tap Hologram',
                    description: 'Real-time inventory tracking system with barcode scanning, automated reordering, and comprehensive reporting. Reduced inventory costs by 25% and improved accuracy.',
                    images: [
                        './portfolio/p1.PNG',
                        './portfolio/p2.PNG',
                        './portfolio/p4.PNG',
                        './portfolio/p5.PNG',
                        './portfolio/p6.PNG',
                        './portfolio/p10.PNG',
                        './portfolio/p12.PNG',
                        './portfolio/p13.PNG',
                        './portfolio/p14.PNG',
                        './portfolio/p15.PNG',
                        './portfolio/p16.PNG',

  
                    ],
                    demoUrl: 'https://staging.airtap.jp/',
                },
                {
                    title: 'Qbot',
                    subtitle: 'Management System',
                    description: 'Real-time inventory tracking system with barcode scanning, automated reordering, and comprehensive reporting. Reduced inventory costs by 25% and improved accuracy.',
                    images: [
                        './portfolio/qbotdev.png',
                        './portfolio/qbotdev1.png',
                        './portfolio/qbotdev2.png',
                        './portfolio/qbotdev3.png',

  
                    ],
                    demoUrl: 'https://dev-backoffice.qbot.jp/public/register',
                   
                },
                {
                    title: 'Kiosk, QDS, KDS',
                    subtitle: 'Management System',
                    description: 'Real-time inventory tracking system with barcode scanning, automated reordering, and comprehensive reporting. Reduced inventory costs by 25% and improved accuracy.',
                    images: [
                        './portfolio/kiosk1.PNG',
                        './portfolio/kiosk3.PNG',
                        './portfolio/kiosk4.PNG',
                        './portfolio/kiosk5.PNG',
                        './portfolio/kiosk6.PNG',
                        './portfolio/kdsdemo.png',
                        './portfolio/qdsdemo.png',

  
                    ],
                    demoUrl: 'https://posdemo.wearecrave.com/kiosk',
                   
                },
                {
                    title: 'AI Classroom',
                    subtitle: 'Generate AI image',
                    description: 'Real-time inventory tracking system with barcode scanning, automated reordering, and comprehensive reporting. Reduced inventory costs by 25% and improved accuracy.',
                    images: [
                        './portfolio/aiclass.png',
                        './portfolio/aiclass1.png',
                        './portfolio/aiclass2.png',
                    ],
                   
                },
            ],
            'mobile-app': [
                {
                    title: 'Wonderpark App',
                    subtitle: 'Cross-platform Mobile App',
                    description: 'Cross-platform mobile application with ticketing.',
                    images: [
                        './portfolio/loginpage.PNG',
                        './portfolio/homepage.PNG',
                        './portfolio/confirmorderpage.PNG',
                        './portfolio/ewalletpage.PNG',
                        './portfolio/orderpage.PNG',
                        './portfolio/pointpage.PNG',
                        './portfolio/productspage.PNG',

                    ],
                    appStoreUrl: 'https://apps.apple.com/example-fitness',
                    playStoreUrl: 'https://play.google.com/store/apps/example-fitness'
                },
                {
                    title: 'Food Delivery App',
                    subtitle: 'On-demand Delivery Platform',
                    description: 'On-demand food delivery platform with real-time tracking, payment integration, and restaurant management system. Serving 500+ orders daily across multiple cities.',
                    images: [
                        'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1200',
                        'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1200',
                        'https://images.pexels.com/photos/326424/pexels-photo-326424.jpeg?auto=compress&cs=tinysrgb&w=1200',
                        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
                        'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200',
                        'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1200'
                    ],
                    appStoreUrl: 'https://apps.apple.com/example-food',
                    playStoreUrl: 'https://play.google.com/store/apps/example-food'
                }
            ]
        };
        
        this.init();
    }

    init() {
        // Add click listeners to portfolio items
        document.querySelectorAll('.portfolio-item').forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.openLightbox(item);
            });
        });
        
        // Close lightbox events
        this.lightboxClose.addEventListener('click', () => this.closeLightbox());
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) this.closeLightbox();
        });
        
        // Navigation events
        this.lightboxPrev.addEventListener('click', () => this.prevImage());
        this.lightboxNext.addEventListener('click', () => this.nextImage());
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.prevImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
            }
        });
    }

    openLightbox(item) {
        // Determine which gallery we're in
        const activeTab = document.querySelector('#portfolioTabs .nav-link.active');
        const activeTabTarget = activeTab.getAttribute('data-bs-target').replace('#', '');
        
        // Get the correct project based on the clicked item within its category
        const projects = this.portfolioData[activeTabTarget];
        
        // Find the local index within the active tab
        const activeTabPane = document.querySelector(activeTab.getAttribute('data-bs-target'));
        const itemsInActiveTab = activeTabPane.querySelectorAll('.portfolio-item');
        const localIndex = Array.from(itemsInActiveTab).indexOf(item);
        
        if (projects && projects[localIndex]) {
            this.currentProject = projects[localIndex];
            this.currentProjectIndex = localIndex;
        } else {
            console.error('Project not found for local index:', localIndex, 'in category:', activeTabTarget);
            return;
        }
        
        this.currentImageIndex = 0;
        
        this.updateLightboxContent();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    prevImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.currentProject.images.length) % this.currentProject.images.length;
        this.updateImageDisplay();
    }

    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.currentProject.images.length;
        this.updateImageDisplay();
    }

    updateLightboxContent() {
        if (!this.currentProject) return;
        
        // Update project info
        this.lightboxTitle.textContent = this.currentProject.title;
        this.lightboxSubtitle.textContent = this.currentProject.subtitle;
        
        // Update image display
        this.updateImageDisplay();
        
        // Generate thumbnails
        this.generateThumbnails();
        
        // Generate action buttons
        this.generateActionButtons();
    }

    updateImageDisplay() {
        if (!this.currentProject || !this.currentProject.images[this.currentImageIndex]) return;
        
        this.lightboxImage.src = this.currentProject.images[this.currentImageIndex];
        this.lightboxImage.alt = `${this.currentProject.title} - Image ${this.currentImageIndex + 1}`;
        
        // Update counter
        this.lightboxCounter.textContent = `${this.currentImageIndex + 1} / ${this.currentProject.images.length}`;
        
        // Update thumbnail active state
        this.updateThumbnailActiveState();
        
        // Show/hide navigation arrows based on image count
        if (this.currentProject.images.length <= 1) {
            this.lightboxPrev.style.display = 'none';
            this.lightboxNext.style.display = 'none';
        } else {
            this.lightboxPrev.style.display = 'flex';
            this.lightboxNext.style.display = 'flex';
        }
    }

    generateThumbnails() {
        if (!this.currentProject) return;
        
        // Clear existing thumbnails
        this.lightboxThumbnails.innerHTML = '<h5>Project Images</h5>';
        
        // Only show thumbnails if there are multiple images
        if (this.currentProject.images.length <= 1) {
            return;
        }
        
        const thumbnailGrid = document.createElement('div');
        thumbnailGrid.className = 'thumbnail-grid';
        
        this.currentProject.images.forEach((imageSrc, index) => {
            const thumbnailItem = document.createElement('div');
            thumbnailItem.className = 'thumbnail-item';
            if (index === this.currentImageIndex) {
                thumbnailItem.classList.add('active');
            }
            
            const thumbnailImg = document.createElement('img');
            thumbnailImg.src = imageSrc;
            thumbnailImg.alt = `${this.currentProject.title} thumbnail ${index + 1}`;
            
            thumbnailItem.appendChild(thumbnailImg);
            
            // Add click event to thumbnail
            thumbnailItem.addEventListener('click', () => {
                this.currentImageIndex = index;
                this.updateImageDisplay();
            });
            
            thumbnailGrid.appendChild(thumbnailItem);
        });
        
        this.lightboxThumbnails.appendChild(thumbnailGrid);
    }

    updateThumbnailActiveState() {
        const thumbnails = this.lightboxThumbnails.querySelectorAll('.thumbnail-item');
        thumbnails.forEach((thumbnail, index) => {
            if (index === this.currentImageIndex) {
                thumbnail.classList.add('active');
            } else {
                thumbnail.classList.remove('active');
            }
        });
    }

    generateActionButtons() {
        if (!this.currentProject) return;
        
        // Clear existing buttons
        this.lightboxButtons.innerHTML = '<h5>Project Links</h5>';
        
        // Add appropriate buttons based on project type
        if (this.currentProject.liveUrl) {
            const liveBtn = this.createButton('Visit Website', this.currentProject.liveUrl, 'btn-visit', 'bi-globe');
            this.lightboxButtons.appendChild(liveBtn);
        }
        
        if (this.currentProject.demoUrl) {
            const demoBtn = this.createButton('View Demo', this.currentProject.demoUrl, 'btn-demo', 'bi-play-circle');
            this.lightboxButtons.appendChild(demoBtn);
        }
        
        if (this.currentProject.caseStudyUrl) {
            const caseBtn = this.createButton('Case Study', this.currentProject.caseStudyUrl, 'btn-visit', 'bi-file-text');
            this.lightboxButtons.appendChild(caseBtn);
        }
        
        if (this.currentProject.reportUrl) {
            const reportBtn = this.createButton('View Report', this.currentProject.reportUrl, 'btn-demo', 'bi-graph-up');
            this.lightboxButtons.appendChild(reportBtn);
        }
        
        if (this.currentProject.githubUrl) {
            const githubBtn = this.createButton('GitHub', this.currentProject.githubUrl, 'btn-visit', 'bi-github');
            this.lightboxButtons.appendChild(githubBtn);
        }
        
        if (this.currentProject.appStoreUrl) {
            const appBtn = this.createButton('App Store', this.currentProject.appStoreUrl, 'btn-visit', 'bi-apple');
            this.lightboxButtons.appendChild(appBtn);
        }
        
        if (this.currentProject.playStoreUrl) {
            const playBtn = this.createButton('Google Play', this.currentProject.playStoreUrl, 'btn-demo', 'bi-google-play');
            this.lightboxButtons.appendChild(playBtn);
        }
        
        if (this.currentProject.resultsUrl) {
            const resultsBtn = this.createButton('View Results', this.currentProject.resultsUrl, 'btn-demo', 'bi-bar-chart');
            this.lightboxButtons.appendChild(resultsBtn);
        }
    }

    createButton(text, url, className, iconClass) {
        const button = document.createElement('a');
        button.href = url;
        button.target = '_blank';
        button.rel = 'noopener noreferrer';
        button.className = `lightbox-btn ${className}`;
        button.innerHTML = `<i class="bi ${iconClass}"></i> ${text}`;
        return button;
    }
}

// Initialize enhanced lightbox gallery
document.addEventListener('DOMContentLoaded', () => {
    new FullScreenLightboxGallery();
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(() => {
    revealOnScroll();
    updateScrollProgress();
}, 10));