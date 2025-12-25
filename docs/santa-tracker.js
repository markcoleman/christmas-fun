/* global L, document */

/**
 * Santa Tracker 2025
 * Tracks Santa's journey around the world on Christmas Eve
 */

class SantaTracker {
  constructor() {
    this.map = null;
    this.journeyData = [];
    this.currentStopIndex = 0;
    this.markers = [];
    this.routeLine = null;
    this.isAnimating = false;
    this.animationSpeed = 1;
    this.animationTimeout = null;

    // Animation configuration
    this.BASE_ANIMATION_DELAY_MS = 3000; // 3 seconds between stops

    // Initialize the tracker
    this.init();
  }

  async init() {
    try {
      // Load journey data
      await this.loadJourneyData();

      // Initialize map
      this.initMap();

      // Setup event listeners
      this.setupEventListeners();

      // Display initial route
      this.displayRoute();

      // Update stats
      this.updateStats();
    } catch (error) {
      console.error('Error initializing Santa Tracker:', error);
      this.showError('Failed to load Santa\'s journey data. Please try again later.');
    }
  }

  async loadJourneyData() {
    const response = await fetch('santa-journey.json');
    if (!response.ok) {
      throw new Error(`Failed to load journey data: ${response.status} ${response.statusText}`);
    }
    this.journeyData = await response.json();
  }

  initMap() {
    // Initialize Leaflet map centered on the world
    this.map = L.map('map', {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 10,
      worldCopyJump: true,
    });

    // Add tile layer (dark theme for Christmas night)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(this.map);
  }

  setupEventListeners() {
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    const speedSlider = document.getElementById('speed-slider');

    playBtn.addEventListener('click', () => this.startAnimation());
    pauseBtn.addEventListener('click', () => this.pauseAnimation());
    resetBtn.addEventListener('click', () => this.resetAnimation());
    speedSlider.addEventListener('input', (e) => {
      this.animationSpeed = parseFloat(e.target.value);
      document.getElementById('speed-value').textContent = `${this.animationSpeed}x`;
    });
  }

  displayRoute() {
    // Create polyline for Santa's route
    const coordinates = this.journeyData.map((stop) => [stop.lat, stop.lng]);
    this.routeLine = L.polyline(coordinates, {
      color: '#c41e3a',
      weight: 3,
      opacity: 0.6,
      smoothFactor: 1,
      dashArray: '10, 10',
    }).addTo(this.map);

    // Create markers for all stops
    this.journeyData.forEach((stop, index) => {
      const marker = this.createMarker(stop, index);
      this.markers.push(marker);
    });
  }

  createMarker(stop, index) {
    const isStart = index === 0;
    const isEnd = index === this.journeyData.length - 1;
    const isCurrent = index === this.currentStopIndex && this.isAnimating;

    // Create custom icon based on stop status
    let iconHtml;
    if (isStart || isEnd) {
      iconHtml = '🏠'; // Home (North Pole)
    } else if (isCurrent) {
      iconHtml = '🎅'; // Santa's current position
    } else if (index < this.currentStopIndex) {
      iconHtml = '✅'; // Visited
    } else {
      iconHtml = '📍'; // Upcoming
    }

    const icon = L.divIcon({
      html: `<div style="font-size: 24px;">${iconHtml}</div>`,
      className: 'custom-marker',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

    const marker = L.marker([stop.lat, stop.lng], { icon })
      .addTo(this.map)
      .bindPopup(this.createPopupContent(stop));

    // Add click event to show location details
    marker.on('click', () => {
      this.showLocationDetails(stop, index);
    });

    return marker;
  }

  createPopupContent(stop) {
    const arrivalTime = new Date(stop.arrivalTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });

    return `
      <div class="popup-content">
        <h4>${stop.city}, ${stop.country}</h4>
        <p class="popup-time">⏰ ${arrivalTime}</p>
        <p>${stop.funFact}</p>
      </div>
    `;
  }

  showLocationDetails(stop, index) {
    const detailsContainer = document.getElementById('location-details');
    const arrivalTime = new Date(stop.arrivalTime).toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });

    const deliveriesFormatted = stop.deliveries.toLocaleString();

    detailsContainer.innerHTML = `
      <div class="location-card">
        <h3>${stop.city}</h3>
        <p class="location-subtitle">
          <span class="material-icons">public</span>
          ${stop.country}
        </p>
        <p class="location-subtitle">
          <span class="material-icons">schedule</span>
          ${arrivalTime}
        </p>
        <div class="fun-fact">
          ${stop.funFact}
        </div>
        <div class="delivery-info">
          <span class="material-icons">card_giftcard</span>
          ${deliveriesFormatted} presents delivered so far!
        </div>
      </div>
    `;

    // Update current stop counter
    document.getElementById('current-stop').textContent = index + 1;
    document.getElementById('total-deliveries').textContent = deliveriesFormatted;
  }

  startAnimation() {
    if (this.isAnimating) return;

    // Reset if we've reached the end
    if (this.currentStopIndex >= this.journeyData.length - 1) {
      this.resetAnimation();
    }

    this.isAnimating = true;
    document.getElementById('play-btn').disabled = true;
    document.getElementById('pause-btn').disabled = false;

    this.animateNextStop();
  }

  animateNextStop() {
    if (!this.isAnimating || this.currentStopIndex >= this.journeyData.length) {
      this.pauseAnimation();
      return;
    }

    const currentStop = this.journeyData[this.currentStopIndex];

    // Update markers
    this.updateMarkers();

    // Show location details
    this.showLocationDetails(currentStop, this.currentStopIndex);

    // Pan map to current location with animation
    this.map.flyTo([currentStop.lat, currentStop.lng], 5, {
      duration: 1.5,
    });

    // Move to next stop after delay (adjusted by speed)
    const delay = this.BASE_ANIMATION_DELAY_MS / this.animationSpeed;

    this.animationTimeout = setTimeout(() => {
      this.currentStopIndex++;
      this.animateNextStop();
    }, delay);
  }

  updateMarkers() {
    // Remove old markers
    this.markers.forEach((marker) => this.map.removeLayer(marker));
    this.markers = [];

    // Recreate markers with updated status
    this.journeyData.forEach((stop, index) => {
      const marker = this.createMarker(stop, index);
      this.markers.push(marker);
    });
  }

  pauseAnimation() {
    this.isAnimating = false;
    document.getElementById('play-btn').disabled = false;
    document.getElementById('pause-btn').disabled = true;

    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
      this.animationTimeout = null;
    }
  }

  resetAnimation() {
    this.pauseAnimation();
    this.currentStopIndex = 0;

    // Reset map view
    this.map.setView([20, 0], 2);

    // Update markers
    this.updateMarkers();

    // Reset location details
    document.getElementById('location-details').innerHTML = `
      <div class="loading-state">
        <p>🎅 Click "Start Journey" to begin tracking Santa!</p>
      </div>
    `;

    // Reset stats
    this.updateStats();
  }

  updateStats() {
    document.getElementById('total-stops').textContent = this.journeyData.length;
    document.getElementById('current-stop').textContent = this.currentStopIndex;

    const currentDeliveries =
      this.currentStopIndex > 0
        ? this.journeyData[this.currentStopIndex - 1].deliveries
        : 0;
    document.getElementById('total-deliveries').textContent =
      currentDeliveries.toLocaleString();
  }

  showError(message) {
    const detailsContainer = document.getElementById('location-details');
    detailsContainer.innerHTML = `
      <div class="loading-state">
        <p style="color: #c41e3a;">⚠️ ${message}</p>
      </div>
    `;
  }
}

// Initialize Santa Tracker when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SantaTracker();
});
