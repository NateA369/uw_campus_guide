document.addEventListener('DOMContentLoaded', function() {
    // Create a new Leaflet map object and set its initial view and zoom level
    var mymap = L.map('mapid').setView([47.656896, -122.307511], 16);

    // Add an OpenStreetMap tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    // Define a GeoJSON object containing features representing different areas on the University of Washington campus
    var myZoneUW = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "name": "Grieg Garden",
                    "popupContents": "small park",
                    "available Sat/Sun": "True"
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [-122.30640632001192, 47.65667499548363],
                        [-122.30710214958543, 47.65621888475974],
                        [-122.3071908795308, 47.655995546331326],
                        [-122.30660245989162, 47.655910614565556],
                        [-122.30595800028644, 47.65636043678964],
                        [-122.30640632001192, 47.65667499548363]
                    ]]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "name": "Suzzallo",
                    "popupContents": "Library",
                    "available Sat/Sun": "False"
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [-122.30866950720471, 47.65536829093699],
                        [-122.3083674969754, 47.65612204942329],
                        [-122.3084533314617, 47.656188431041215],
                        [-122.30851691256251, 47.656188431041215],
                        [-122.30861864232409, 47.6561520282288],
                        [-122.30877759507622, 47.655531035167485],
                        [-122.30866950720471, 47.65536829093699]
                    ]]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "name": "Husky Union Building",
                    "popupContents": "HUB",
                    "available Sat/Sun": "True"
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [-122.30534016608942, 47.6546681081706],
                        [-122.30512751656309, 47.65473661430198],
                        [-122.30522459569448, 47.654892309722015],
                        [-122.30474844566928, 47.65505734635937],
                        [-122.30463749809022, 47.655483948081894],
                        [-122.30479929664268, 47.65551820062396],
                        [-122.3047808053796, 47.65566766599815],
                        [-122.30480854227446, 47.655798447849776],
                        [-122.30532167482633, 47.65587318018984],
                        [-122.30536790298385, 47.65565521056692],
                        [-122.30548347337835, 47.65567389371293],
                        [-122.30559442095742, 47.65497015725762],
                        [-122.30534016608942, 47.6546681081706]
                    ]]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "name": "Drumheller Fountain",
                    "popupContents": "Iconic campus fountain",
                    "available Sat/Sun": "True"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [-122.307502, 47.653615]
                }
            },
            {
                "type": "Feature",
                "properties": {
                    "name": "Red Square",
                    "popupContents": "Central campus plaza",
                    "available Sat/Sun": "True"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [-122.309494, 47.656169]
                }
            },
           {
            "type": "Feature",
            "properties": {
                "name": "Denny Hall",
                "popupContents": "Oldest building on campus",
                "available Sat/Sun": "False"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-122.30871677398682, 47.65900916894531],
                    [-122.30858802795409, 47.65900916894531],
                    [-122.30858802795409, 47.65889051310554],
                    [-122.30871677398682, 47.65889051310554],
                    [-122.30871677398682, 47.65900916894531]
                ]]
            },
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Quad",
                "popupContents": "Cherry blossom viewing spot",
                "available Sat/Sun": "True"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-122.30768680572511, 47.65746688316186],
                    [-122.30705380439758, 47.65746688316186],
                    [-122.30705380439758, 47.65698722839355],
                    [-122.30768680572511, 47.65698722839355],
                    [-122.30768680572511, 47.65746688316186]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Rainier Vista",
                "popupContents": "Scenic view point",
                "available Sat/Sun": "True"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-122.30396390000001, 47.65277780000001]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Husky Stadium",
                "popupContents": "Football stadium",
                "available Sat/Sun": "Event dependent"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-122.30132700000001, 47.65021390000001]
            }
        }
        ]
    };

    // Define a function to set the default style for all features
    function styleFunction() {
        return { color: "purple", fillOpacity: 0.3 };
    }

    // Define a function to set the style for features on mouseover
    function newStyle(layer) {
        layer.setStyle({ color: "blue", fillOpacity: 0.5 });
    }

    // Define a function to reset the style for features on mouseout
    function oldStyle(layer) {
        layer.setStyle(styleFunction());
    }

    // Define a function to handle mouseover and mouseout events for each feature
    function happenHover(feature, layer) {
        // Bind a popup to the layer with the feature's name and popupContents property
        layer.bindPopup(feature.properties.name + '<br>' + feature.properties.popupContents, { closeButton: false });
        // Add event listeners for mouseover and mouseout events
        layer.on('mouseover', function () { 
            layer.openPopup(); 
            newStyle(layer);
        });
        layer.on('mouseout', function () { 
            layer.closePopup(); 
            oldStyle(layer);
        });
    }

    // Create a GeoJSON layer from the myZoneUW object, passing the styleFunction and happenHover functions as options
    var geojsonLayer = L.geoJSON(myZoneUW, {
        style: styleFunction,
        onEachFeature: happenHover,
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 8,
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        }
    }).addTo(mymap);

    // Fit the map to the bounds of the GeoJSON layer
    mymap.fitBounds(geojsonLayer.getBounds());
});