document.addEventListener("DOMContentLoaded", () => {
    const trackForm = document.getElementById('tracking-form');
    const trackInput = document.getElementById('tracking-input');
    const trackResult = document.getElementById('tracking-result');
    const progressFill = document.querySelector('.progress-fill');
    
    if (trackForm) {
        trackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = trackInput.value.trim();
            if (val === '') return;

            // Simulate searching animation
            const btn = trackForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Searching...';
            btn.disabled = true;

            setTimeout(() => {
                trackResult.style.display = 'block';
                btn.innerHTML = originalText;
                btn.disabled = false;
                
                // Animate progress bar
                setTimeout(() => {
                    if (progressFill) {
                        progressFill.style.width = '75%'; // Simulating 75% delivery progress
                    }
                }, 100);
            }, 1500);
        });
    }

    // 3D Vehicle Scroll Animation (Updated for native 3D image)
    const vehicle = document.createElement('img');
    vehicle.src = 'images/vehicle.webp'; // Updated to WebP
    vehicle.id = 'scroll-vehicle';
    vehicle.alt = 'Delivery Vehicle';
    
    // Fallback if the generated image is not loaded
    vehicle.onerror = function() {
        this.src = 'images/tracking.webp';
    };
    
    // Base styles (no heavy 3D rotate since image is already 3D)
    vehicle.style.cssText = `
        position: fixed;
        right: 8%;
        top: 20%;
        width: 150px;
        z-index: 999;
        transition: top 0.1s ease-out, opacity 0.3s ease, transform 0.2s ease-out;
        filter: drop-shadow(-10px 20px 15px rgba(0,0,0,0.4));
        pointer-events: none;
    `;
    document.body.appendChild(vehicle);

    let lastScrollY = window.scrollY;
    let stopTimeout;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        
        let scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0;
        if(scrollPercent > 1) scrollPercent = 1;
        
        // Move vehicle vertically down the screen as user scrolls
        const startTop = 20; 
        const endTop = 75; 
        const currentTop = startTop + (scrollPercent * (endTop - startTop));
        vehicle.style.top = `${currentTop}%`;
        
        // Check for footer collision
        const footer = document.querySelector('.footer');
        let hideVehicle = false;
        
        if (footer) {
            const vehicleRect = vehicle.getBoundingClientRect();
            const footerRect = footer.getBoundingClientRect();
            if (vehicleRect.bottom + 50 > footerRect.top) {
                hideVehicle = true;
            }
        }
        
        if (hideVehicle) {
            vehicle.style.opacity = '0';
        } else {
            vehicle.style.opacity = '1';
            
            // Add a slight tilt/bounce for movement effect
            const delta = scrollY - lastScrollY;
            let tiltZ = 0; 
            let scale = 1;
            
            if (delta > 0) {
                tiltZ = -5; // slightly turning right when going down
                scale = 1.05;
            } else if (delta < 0) {
                tiltZ = 5; // slightly turning left when going up
                scale = 0.95;
            }
            
            vehicle.style.transform = `rotateZ(${tiltZ}deg) scale(${scale})`;
            
            // Reset tilt after scrolling stops
            clearTimeout(stopTimeout);
            stopTimeout = setTimeout(() => {
                if(vehicle.style.opacity === '1') {
                    vehicle.style.transform = `rotateZ(0deg) scale(1)`;
                }
            }, 150);
        }
        
        lastScrollY = scrollY;
    });
});