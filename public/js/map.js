mapboxgl.accessToken =
  "pk.eyJ1IjoibWVsa2hpIiwiYSI6ImNrNWJiNHNiNDBhdHAzbG5xMGVoNWhjd20ifQ.9_j-K_G4sjVRdlZlEuCJ4w";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 10,
  center: [24.891998, 60.237346]
});

// Fetch stores from API
async function getStores() {
  const response = await fetch("/api/v1/stores");
  const data = await response.json();

  const stores = data.data.map(store => {
    return {
      type: "Feature",
      geometry: {
        type: store.location.type,
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1]
        ]
      },
      properties: {
        storeId: store.storeId,
        icon: "shop"
      }
    };
  });
  loadMap(stores);
}

// Load map with stores
function loadMap(stores) {
  map.on("load", function() {
    map.addLayer({
      id: "points",
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stores
          // features: [
          //   {
          //     type: "Feature",
          //     geometry: {
          //       type: "Point",
          //       coordinates: [24.891998, 60.237346]
          //     },
          //     properties: {
          //       storeId: "0001",
          //       icon: "shop"
          //     }
          //   }
          // ]
        }
      },
      layout: {
        "icon-image": "{icon}-15",
        "icon-size": 1.5,
        "text-field": "{storeId}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.9],
        "text-anchor": "top"
      }
    });
  });
}

getStores();
