// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    initializeApp();
});

function initializeApp() {
    // Detect OS and update download buttons
    const os = detectOS();
    updateDownloadButtons(os);
    
    // Initialize typing animation
    initializeTypingAnimation();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize copy buttons
    initializeCopyButtons();
    
    // Initialize tilt effect
    initializeTiltEffect();
    
    // Initialize intersection observer for animations
    initializeAnimationObserver();
    
    // Update copyright year
    updateCopyrightYear();
    
    // Initialize nav glow animation
    initializeNavGlow();
}

// OS Detection
function detectOS() {
    const platform = navigator.platform?.toLowerCase() || '';
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (/mac|iphone|ipad|darwin/.test(platform) || /mac/.test(userAgent)) {
        return 'mac';
    } else if (/linux|x11/.test(platform) || /linux/.test(userAgent)) {
        return 'linux';
    } else {
        return 'windows';
    }
}

// Update download buttons based on OS
function updateDownloadButtons(os) {
    const downloads = {
        windows: { 
            label: 'Download', 
            file: 'https://github.com/SathvikHaridasu/AutoScribe/releases/download/v1.0.6/AutoScribe-v1.0.6-Setup.exe', 
            note: 'AutoScribe-Setup.exe' 
        },
        mac: { 
            label: 'Download', 
            file: 'https://github.com/SathvikHaridasu/AutoScribe/releases/download/v1.0.6/AutoScribe-v1.0.6.dmg', 
            note: 'AutoScribe.dmg' 
        },
        linux: { 
            label: 'Download', 
            file: 'https://github.com/SathvikHaridasu/AutoScribe/releases', 
            note: 'autoscribe.AppImage' 
        }
    };
    
    // The rest of the function remains the same
}

// Typing Animation
function initializeTypingAnimation() {
    const samples = [
        "Automating typing...",
        "Simulating real key events...",
        "Global hotkeys armed (F6/F7/F8)...",
        "Corner kill-switch ready...",
        "Typing like a human, faster than a human."
    ];
    
    let currentIndex = 0;
    let currentText = "";
    let phase = "typing"; // typing, pause, deleting
    
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;
    
    function typeText() {
        const targetText = samples[currentIndex % samples.length];
        
        if (phase === "typing") {
            if (currentText.length < targetText.length) {
                currentText = targetText.slice(0, currentText.length + 1);
                textElement.textContent = currentText;
                
                // Random typing delay
                const delay = 24 + Math.random() * 40;
                setTimeout(typeText, delay);
            } else {
                phase = "pause";
                setTimeout(() => {
                    phase = "deleting";
                    typeText();
                }, 900);
            }
        } else if (phase === "deleting") {
            if (currentText.length > 0) {
                currentText = currentText.slice(0, -1);
                textElement.textContent = currentText;
                
                // Random deletion delay
                const delay = 12 + Math.random() * 30;
                setTimeout(typeText, delay);
            } else {
                currentIndex++;
                phase = "typing";
                setTimeout(typeText, 100);
            }
        }
    }
    
    typeText();
}

// Smooth Scrolling
function initializeSmoothScrolling() {
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
}

// Copy Buttons
function initializeCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', async function() {
            const textToCopy = this.getAttribute('data-text');
            const originalSpan = this.querySelector('span');
            const originalText = originalSpan.textContent;
            
            try {
                await navigator.clipboard.writeText(textToCopy);
                
                // Visual feedback
                this.classList.add('copied');
                originalSpan.textContent = 'Copied!';
                
                setTimeout(() => {
                    this.classList.remove('copied');
                    originalSpan.textContent = originalText;
                }, 1500);
                
            } catch (err) {
                console.error('Failed to copy text: ', err);
                
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                originalSpan.textContent = 'Copied!';
                setTimeout(() => {
                    originalSpan.textContent = originalText;
                }, 1500);
            }
        });
    });
}

// Tilt Effect
function initializeTiltEffect() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        let rotateX = 0;
        let rotateY = 0;
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateXValue = ((y - centerY) / centerY) * -10;
            const rotateYValue = ((x - centerX) / centerX) * 10;
            
            rotateX = rotateXValue;
            rotateY = rotateYValue;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

// Animation Observer
function initializeAnimationObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.feature-card, .usage-card, .section-title').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Nav Glow Animation
function initializeNavGlow() {
    const navGlow = document.querySelector('.nav-glow');
    if (!navGlow) return;
    
    // Animate the glow effect
    let scale = 1;
    let opacity = 0.5;
    let growing = true;
    let fadingIn = true;
    
    function animate() {
        if (growing) {
            scale += 0.002;
            if (scale >= 1.2) growing = false;
        } else {
            scale -= 0.002;
            if (scale <= 1) growing = true;
        }
        
        if (fadingIn) {
            opacity += 0.002;
            if (opacity >= 0.7) fadingIn = false;
        } else {
            opacity -= 0.002;
            if (opacity <= 0.5) fadingIn = true;
        }
        
        navGlow.style.transform = `scale(${scale})`;
        navGlow.style.opacity = opacity;
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Update Copyright Year
function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Parallax Effect for Background Elements
function initializeParallax() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-glow, .demo-glow-1, .demo-glow-2');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        
        ticking = false;
    }
    
    function requestTick