document.addEventListener('DOMContentLoaded', () => {
    const mapEl = document.getElementById('map');
    if (!mapEl || !window.secondComingMap) return;

    const map = L.map('map', {
        gestureHandling: true,
        dragging: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        touchZoom: true,
        zoomControl: false
    }).setView([secondComingMap.lat, secondComingMap.lon], 16);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap & CartoDB',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    const icon = L.divIcon({
        html: '<div style="background:#0f0;color:#000;padding:4px 8px;border-radius:4px;font-weight:bold;box-shadow:0 0 15px #0f0;">Second Coming</div>',
        iconSize: [120, 30],
        className: 'cyber-marker'
    });

    L.marker([secondComingMap.lat, secondComingMap.lon], { icon })
        .addTo(map)
        .bindPopup('<b style="color:#0f0;">Second Coming</b><br>Cyberpunk Store')
        .openPopup();

    // Effet glow
    setInterval(() => {
        document.querySelectorAll('.cyber-marker').forEach(el => {
            el.style.boxShadow = el.style.boxShadow ? '' : '0 0 20px #0f0';
        });
    }, 800);
});
