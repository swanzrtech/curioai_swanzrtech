// Premium Loading Screen JS
document.addEventListener('DOMContentLoaded', function() {
  // Create loading overlay
  const loadingOverlay = document.createElement('div');
  loadingOverlay.className = 'loading-overlay';
  loadingOverlay.innerHTML = `
    <div class="loading-content">
      <div class="loading-rings">
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
      </div>
      <div class="loading-logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      </div>
      <div class="loading-text">SWANZR</div>
      <div class="loading-subtext">Built for What’s Next.</div>
      <div class="loading-progress">
        <div class="progress-bar"></div>
      </div>
    </div>
  `;
  document.body.appendChild(loadingOverlay);

  // Hide after 3.5 seconds with smooth transition
  setTimeout(() => {
    loadingOverlay.style.opacity = '0';
    setTimeout(() => {
      loadingOverlay.remove();
    }, 800);
  }, 3000);
});
