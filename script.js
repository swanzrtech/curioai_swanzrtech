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

// Form submission handler
document.querySelector('#contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Create success animation
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    
    button.innerHTML = '🚀 Processing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = '✨ Added to Waitlist!';
        
        // Show custom toast message
        showToast('Thank you for joining the Swanzr Tech waitlist! We\'ll notify you when we launch.', 'success');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            this.reset();
        }, 3000);
    }, 1500);
});

// Download proposal handler
function setupDownloadButton() {
    const downloadButton = document.querySelector('.download-proposal-btn');
    if (downloadButton) {
        downloadButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const button = this;
            const originalText = button.innerHTML;
            
            button.innerHTML = '⬇️ Downloading...';
            button.disabled = true;
            
            // Simulate download delay
            setTimeout(() => {
                // Create a hidden link to download the file
                const link = document.createElement('a');
                link.href = 'Curio_AI_Proposal.pdf'; // Path to your PDF file
                link.download = 'Curio_AI_by_Swanzr_Tech_Proposal.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                button.innerHTML = '✅ Downloaded!';
                
                // Show custom toast message
                showToast('Swanzr Tech proposal downloaded successfully!', 'success');
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
}

// Custom toast notification system
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        toastContainer.style.position = 'fixed';
        toastContainer.style.bottom = '2rem';
        toastContainer.style.right = '2rem';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} glass-card`;
    toast.style.minWidth = '300px';
    toast.style.padding = '1rem 1.5rem';
    toast.style.marginBottom = '1rem';
    toast.style.borderRadius = '0.75rem';
    toast.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
    toast.style.animation = 'slideIn 0.3s ease forwards';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.fontFamily = "'Space Grotesk', sans-serif";
    
    // Icon based on type
    let icon = '💬';
    if (type === 'success') icon = '✨';
    if (type === 'error') icon = '❌';
    if (type === 'warning') icon = '⚠️';
    
    // Add content to toast
    toast.innerHTML = `
        <div style="margin-right: 1rem; font-size: 1.5rem;">${icon}</div>
        <div>${message}</div>
    `;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Remove after delay
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            toastContainer.removeChild(toast);
            // Remove container if empty
            if (toastContainer.childNodes.length === 0) {
                document.body.removeChild(toastContainer);
            }
        }, 300);
    }, 4000);
}

// Enhanced scroll effects
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    const scrolled = window.scrollY > 100;
    
    if (scrolled) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.backdropFilter = 'blur(25px)';
        nav.style.webkitBackdropFilter = 'blur(25px)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.8)';
        nav.style.backdropFilter = 'blur(20px)';
        nav.style.webkitBackdropFilter = 'blur(20px)';
    }
});

// Parallax effect for floating elements
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-orb');
    
    parallax.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Interactive hover effects for feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    });
});

// Newsletter form in footer
const newsletterForm = document.querySelector('footer form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = this.querySelector('button');
        const originalText = button.innerHTML;
        
        button.innerHTML = 'Processing...';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = 'Subscribed!';
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                this.reset();
            }, 2000);
        }, 1500);
    });
}

// Animated counter for statistics
function animateCounter(el, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        el.innerHTML = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            el.innerHTML = end;
        }
    };
    window.requestAnimationFrame(step);
}

// Intersection Observer for animated elements
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // If this is a stat counter, animate it
            if (entry.target.classList.contains('stat-number')) {
                const endValue = parseInt(entry.target.getAttribute('data-value'));
                animateCounter(entry.target, 0, endValue, 2000);
            }
            
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

// Observe all elements with animation classes
document.querySelectorAll('.animate-on-scroll, .stat-number, .glass-card, .roadmap-item, .feature-card').forEach(el => {
    observer.observe(el);
});

function showFuturisticToast(message) {
    let toast = document.createElement('div');
    toast.className = 'futuristic-toast fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-8 py-5 rounded-2xl shadow-2xl text-white text-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 backdrop-blur-xl border border-white/20 animate-fade-in';
    toast.innerHTML = `<span class='block text-xl font-bold tracking-wide mb-1'>🚀 Waitlist Update</span><span class='block text-base font-medium'>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('animate-fade-out');
        setTimeout(() => toast.remove(), 800);
    }, 3500);
}

// Waitlist button click handler
const waitlistBtn = document.querySelector('.btn-futuristic');
if (waitlistBtn) {
    waitlistBtn.addEventListener('click', function() {
        showFuturisticToast("We will notify you when our waitlist opens.<br><span class='text-pink-200'>Stay tuned for the future of information clarity.</span> <span class='text-blue-200 font-bold'>Something fresh and new is coming soon.</span>");
    });
}

// Toast animation styles
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeInToast { from { opacity: 0; transform: translateY(-30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes fadeOutToast { from { opacity: 1; } to { opacity: 0; transform: translateY(-30px) scale(0.95); } }
.futuristic-toast.animate-fade-in { animation: fadeInToast 0.7s cubic-bezier(.77,0,.18,1); }
.futuristic-toast.animate-fade-out { animation: fadeOutToast 0.8s cubic-bezier(.77,0,.18,1) forwards; }
`;
document.head.appendChild(style);
