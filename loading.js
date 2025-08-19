// Loading screen functionality
(function() {
    // Create loading screen elements
    function createLoadingScreen() {
        const loadingScreen = document.createElement('div');
        loadingScreen.id = 'loading-screen';

        // Premium background gradient
        loadingScreen.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)';
        loadingScreen.style.boxShadow = '0 8px 32px rgba(60, 60, 90, 0.12)';

        // Create quote with animation
        const quote = document.createElement('div');
        quote.className = 'premium-quote';
        quote.textContent = "Built for What's Next.";
        quote.style.opacity = '0';
        quote.style.transform = 'translateY(30px)';
        setTimeout(() => {
            quote.style.transition = 'opacity 1.2s cubic-bezier(.77,0,.18,1), transform 1.2s cubic-bezier(.77,0,.18,1)';
            quote.style.opacity = '1';
            quote.style.transform = 'translateY(0)';
        }, 400);

        // Create loader container
        const loaderContainer = document.createElement('div');
        loaderContainer.className = 'loader-container';

        // Create circular loader
        const circularLoader = document.createElement('div');
        circularLoader.className = 'circular-loader premium-shadow';

        // Create Swanzr logo
        const swanzrLogo = document.createElement('div');
        swanzrLogo.className = 'swanzr-logo';
        const logoText = document.createElement('div');
        logoText.className = 'logo-text';
        logoText.textContent = 'SWANZR';
        swanzrLogo.appendChild(logoText);

        // Create progress bar
        const loadingProgress = document.createElement('div');
        loadingProgress.className = 'loading-progress';
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        loadingProgress.appendChild(progressBar);

        // Create loading text
        const loadingText = document.createElement('div');
        loadingText.className = 'loading-text';
        loadingText.textContent = 'Loading Curio AI...';

        // Assemble the loading screen
        loadingScreen.appendChild(quote); // Add quote at top center
        loaderContainer.appendChild(circularLoader);
        loaderContainer.appendChild(swanzrLogo);
        loadingScreen.appendChild(loaderContainer);
        loadingScreen.appendChild(loadingProgress);
        loadingScreen.appendChild(loadingText);

        document.body.appendChild(loadingScreen);

        return {
            screen: loadingScreen,
            progressBar: progressBar,
            loadingText: loadingText
        };
    }
    
    // Initialize loading screen
    let loadingElements;
    document.addEventListener('DOMContentLoaded', function() {
        loadingElements = createLoadingScreen();
        simulateLoading();
    });
    
    // Simulate loading progress
    function simulateLoading() {
        const { progressBar, loadingText } = loadingElements;
        let progress = 0;
        const loadingTexts = [
            'Preparing monitoring...',
            'Setting up...',
            'Initializing...',
            'Almost ready...'
        ];
        
        const interval = setInterval(() => {
            progress += Math.random() * 20; // Increase progress faster
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                hideLoadingScreen();
            }
            
            // Update progress bar
            progressBar.style.width = `${progress}%`;
            
            // Update loading text
            const textIndex = Math.min(
                Math.floor(progress / 25),
                loadingTexts.length - 1
            );
            loadingText.textContent = loadingTexts[textIndex];
        }, 500); // Reduce interval time
    }
    
    // Hide loading screen
    function hideLoadingScreen() {
        setTimeout(() => {
            loadingElements.screen.classList.add('loading-hidden');
            
            // After animation, remove from DOM
            setTimeout(() => {
                document.body.removeChild(loadingElements.screen);
                
                // Initialize page after loading completes
                initializePage();
            }, 600);
        }, 350);
    }
    
    // Initialize page elements and handlers after loading
    function initializePage() {
        // Setup download button functionality
        setupDownloadButton();
        
        // Show welcome toast
        setTimeout(() => {
            showToast('Welcome to Curio AI by Swanzr Tech!', 'info');
        }, 600);
        
        // Add any additional initialization here
        document.body.classList.add('content-loaded');
    }
})();
