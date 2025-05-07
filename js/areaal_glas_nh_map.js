// Initialize the map centered on Noord-Holland
const map = L.map('map').setView([52.6316, 4.7533], 9);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Sample data for municipalities in Noord-Holland
const municipalityData = {
    'Aalsmeer': 220,
    'Uithoorn': 180,
    'Haarlemmermeer': 160,
    'Medemblik': 140,
    'Hollands Kroon': 120,
    'Heerhugowaard': 100,
    'Enkhuizen': 80,
    'Amstelveen': 60,
    'Amsterdam': 40
};

// Function to get color based on area value
function getColor(d) {
    return d > 200 ? '#006837' :
           d > 150 ? '#31a354' :
           d > 100 ? '#78c679' :
           d > 50  ? '#c2e699' :
                    '#ffffcc';
}

// Fetch GeoJSON data and create the choropleth map
fetch('data/noord-holland-municipalities.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: feature => {
                const municipalityName = feature.properties.name;
                const value = municipalityData[municipalityName] || 0;
                return {
                    fillColor: getColor(value),
                    weight: 1,
                    opacity: 1,
                    color: 'white',
                    fillOpacity: 0.7
                };
            },
            onEachFeature: (feature, layer) => {
                const municipalityName = feature.properties.name;
                const value = municipalityData[municipalityName] || 0;
                layer.bindPopup(`
                    <strong>${municipalityName}</strong><br>
                    Areaal glastuinbouw: ${value} hectare
                `);
            }
        }).addTo(map);

        // Add a legend
        const legend = L.control({position: 'bottomright'});
        legend.onAdd = function(map) {
            const div = L.DomUtil.create('div', 'info legend');
            const grades = [0, 50, 100, 150, 200];
            const labels = [];

            div.innerHTML = '<h4>Areaal (ha)</h4>';
            
            for (let i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            }
            
            return div;
        };
        legend.addTo(map);
    }); 