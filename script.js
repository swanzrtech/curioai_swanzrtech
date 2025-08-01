// Particle Background Animation
class ParticleBackground {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        
        this.init();
        this.animate();
        this.handleResize();
    }

    init() {
        this.setCanvasSize();
        this.createParticles();
    }

    setCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY *= -1;
            }

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 207, 255, ${particle.opacity})`;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.setCanvasSize();
            this.createParticles();
        });
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-reveal]');
        this.options = {
            threshold: 0.1,
            rootMargin: '0px'
        };

        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                }
            });
        }, this.options);

        this.elements.forEach(element => observer.observe(element));
    }
}

// Counter Animation
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.traction-number');
        this.speed = 200;
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animate(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => observer.observe(counter));
    }

    animate(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        let count = 0;
        
        const updateCount = () => {
            const increment = target / this.speed;
            
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    }
}

// Header Scroll Effect
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.scrollThreshold = 50;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > this.scrollThreshold) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        });
    }
}

// Form Handling
class FormHandler {
    constructor() {
        this.waitlistBtn = document.getElementById('joinWaitlistBtn');
        this.downloadBtn = document.getElementById('downloadProposalBtn');
        this.waitlistForm = document.getElementById('waitlistForm');
        this.emailInput = document.getElementById('emailInput');
        this.formStatus = document.getElementById('formStatus');
        this.init();
    }

    init() {
        if (this.waitlistBtn) {
            this.waitlistBtn.addEventListener('click', () => this.handleWaitlist());
        }
        
        if (this.downloadBtn) {
            this.downloadBtn.addEventListener('click', () => this.handleDownload());
        }
        
        if (this.waitlistForm) {
            this.waitlistForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '16px 24px';
        notification.style.borderRadius = '8px';
        notification.style.background = type === 'success' ? 'rgba(0, 255, 184, 0.1)' : 'rgba(255, 87, 87, 0.1)';
        notification.style.border = `1px solid ${type === 'success' ? 'var(--accent-teal)' : '#ff5757'}`;
        notification.style.color = 'var(--text-primary)';
        notification.style.backdropFilter = 'blur(10px)';
        notification.style.zIndex = '1000';
        notification.style.animation = 'slideIn 0.3s ease-out';
        notification.style.fontFamily = 'Inter, sans-serif';
        notification.style.fontSize = '14px';

        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    handleWaitlist(e) {
        if (e) e.preventDefault();
        const email = this.emailInput ? this.emailInput.value : '';
        
        if (email && this.emailInput) {
            // Clear the input
            this.emailInput.value = '';
        }
        
        // Show success message
        this.showNotification("🚀 Exciting times ahead! We will notify you when our waitlist opens. Stay tuned for the future of information clarity!");
    }

    handleDownload() {
        // Direct download from the correct path
        const proposalPath = '/Curioai_proposal.pdf';
        const link = document.createElement('a');
        link.href = proposalPath;
        link.download = 'CurioAI_YC_Proposal.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.showNotification("📥 Your download has started! Explore our vision for the future of information clarity.");
    }
    
    async handleFormSubmit(e) {
        e.preventDefault();
        
        // Get the email
        const email = this.emailInput.value.trim();
        
        // Validate email format
        if (!this.validateEmail(email)) {
            this.showStatus('Please enter a valid email address', 'error');
            return;
        }
        
        try {
            this.showStatus('Submitting...', '');
            
            // Send confirmation email to user via EmailJS
            await this.sendConfirmationEmail(email);
            
            // Submit to backend API (serverless function)
            await this.submitToWaitlist(email);
            
            // Show success and reset form
            this.showStatus('Thank you! You\'ve been added to our waitlist.', 'success');
            this.waitlistForm.reset();
            
        } catch (error) {
            console.error('Error:', error);
            this.showStatus('There was an error submitting your request. Please try again.', 'error');
        }
    }
    
    async sendConfirmationEmail(email) {
        // Using EmailJS for sending confirmation email
        const templateParams = {
            to_email: email,
            to_name: email.split('@')[0],
            subject: 'Welcome to the Curio AI Waitlist!'
        };
        
        try {
            await emailjs.send(
                'default_service', // Replace with your EmailJS service ID
                'template_confirmation', // Replace with your template ID
                templateParams,
                'user_xyzAbCdEfG123' // Replace with your user ID
            );
            console.log('Confirmation email sent successfully');
            return true;
        } catch (error) {
            console.error('Failed to send confirmation email:', error);
            throw new Error('Failed to send confirmation email');
        }
    }
    
    async submitToWaitlist(email) {
        // Submitting to serverless function API
        try {
            // Replace with your actual API endpoint when deployed
            const apiUrl = 'https://your-api-domain.com/.netlify/functions/waitlist';
            
            // For development testing, we'll simulate success
            // In production, uncomment this code and use your actual API endpoint
            /*
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to submit to waitlist');
            }
            
            return data;
            */
            
            // Simulation for development
            console.log(`Simulating API submission for: ${email}`);
            await new Promise(resolve => setTimeout(resolve, 800));
            return { success: true, message: 'Successfully added to waitlist' };
            
        } catch (error) {
            console.error('Failed to submit to waitlist API:', error);
            throw new Error('Failed to submit to waitlist');
        }
    }
}

// Timeline Animations
class TimelineAnimations {
    constructor() {
        this.timelineItems = document.querySelectorAll('.timeline-item');
        this.options = {
            threshold: 0.1,
            rootMargin: '0px'
        };

        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                }
            });
        }, this.options);

        this.timelineItems.forEach(item => observer.observe(item));
    }
}

// Validation Stats Animations
class ValidationStatsAnimations {
    constructor() {
        this.stats = document.querySelectorAll('.traction-number');
        this.speed = 200;
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animate(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.stats.forEach(stat => observer.observe(stat));
    }

    animate(stat) {
        const target = parseInt(stat.getAttribute('data-count'));
        let count = 0;

        const updateCount = () => {
            const increment = target / this.speed;

            if (count < target) {
                count += increment;
                stat.innerText = Math.ceil(count);
                setTimeout(updateCount, 1);
            } else {
                stat.innerText = target;
            }
        };

        updateCount();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleBackground();
    new ScrollAnimations();
    new CounterAnimation();
    new HeaderScroll();
    new FormHandler();
    new TimelineAnimations();
    new ValidationStatsAnimations();

    // Add smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Add mockup content dynamically
function addMockupContent() {
    const mockupContent = document.querySelector('.mockup-content');
    const insights = [
        {
            time: 'Just now',
            sentiment: 'positive',
            text: 'Tesla announces breakthrough in battery technology, extending range by 50%'
        },
        {
            time: '2m ago',
            sentiment: 'neutral',
            text: 'Fed maintains current interest rates, signals potential adjustments in Q4'
        },
        {
            time: '5m ago',
            sentiment: 'negative',
            text: 'Major cybersecurity breach affects multiple tech companies'
        }
    ];

    insights.forEach(insight => {
        const card = document.createElement('div');
        card.className = 'insight-card';
        card.innerHTML = `
            <div class="insight-header">
                <span class="insight-time">${insight.time}</span>
                <span class="sentiment ${insight.sentiment}">${insight.sentiment}</span>
            </div>
            <p class="insight-text">${insight.text}</p>
        `;
        mockupContent.appendChild(card);
    });
}

// Call mockup content function after DOM load
document.addEventListener('DOMContentLoaded', addMockupContent);
