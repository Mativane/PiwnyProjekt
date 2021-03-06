// Najpierw nadajemy nasz access token, czyli mapboxowe uwierzytelnienie konta
// Więc o access tokenie tu: https://docs.mapbox.com/help/how-mapbox-works/access-tokens
mapboxgl.accessToken = 'pk.eyJ1IjoibmF0YWxpYWNob2puYWNrYSIsImEiOiJjanZ4Z202dDAwNGlrNGJtcXF1a3lhbXh1In0.djjjVEHUcv59eZ5zS8Jucg';

function flyToStore(currentFeature, zoomlv) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom:zoomlv
  });
}

var aktywna_warstwa = 'projekt-piwny-1ixmu5'
function przelacz(layer) { 

  if (typeof popup != 'undefined'){
    popup.remove()
  }
  
  map.setLayoutProperty('projekt-piwny-1ixmu5', 'visibility', 'none')
  map.setLayoutProperty('tanie-srednie-c0fh5i', 'visibility', 'none')
  map.setLayoutProperty('tanie-5f5gcv', 'visibility', 'none')
  
  map.setLayoutProperty(layer, 'visibility', 'visible')

  aktywna_warstwa = layer
  
  map.flyTo({
    zoom:15.50
  });

  // When a click event occurs on a feature in the projekt-piwny-1ixmu5 layer, open a popup at the
  // location of the feature, with description HTML from its properties.
  map.on('click', aktywna_warstwa, function (e) {
  var coordinates = e.features[0].geometry.coordinates.slice();
  var description = '<h3>' + e.features[0].properties.Nazwa + '</h3>' +
    '<h4>' + e.features[0].properties.Adres +
    "<br>" + 'Piwo od: ' +  e.features[0].properties.Cena + ' zł' + '<h4>'
  flyToStore(e.features[0], 17)

  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
    
  popup = new mapboxgl.Popup()
  .setLngLat(coordinates)
  .setHTML(description)
  .addTo(map);
  });
      
  // Change the cursor to a pointer when the mouse is over the active layer.
  map.on('mouseenter', aktywna_warstwa, function () {
  map.getCanvas().style.cursor = 'pointer';
  });
    
  // Change it back to a pointer when it leaves.
  map.on('mouseleave', aktywna_warstwa, function () {
  map.getCanvas().style.cursor = '';
  });
}

function hide() {
  var x = document.getElementById('plus18');
  x.style.display = 'none';
  przelacz(layer='projekt-piwny-1ixmu5')
}

//Tworzymy nowy obiekt o nazwie map, za pomocą funkcji pobranej z mapboxa
const map = new mapboxgl.Map({
    // Nadajemy mu kontener, czyli to gdzie ma się pojawiać. 
    // To 'map' nawiązuje do "ID = 'map'" w <div> w pliku index.html
  container: 'map',
    // Style odpowiada za połączenie się do "dobrej" mapy z mapbox studio
    // W naszym przypadku - tej stworzonej przez Karola z zamieszczonymi punktami pubów
  style: 'mapbox://styles/nataliachojnacka/cjwkh0q0368mg1cmdjbou5m1j/draft',
    // Centrowanie i zoom odpowiada za ustawienie perseptywy w której wczytuje się mapa
  center: [16.935,52.4083],
  zoom: 15.50

});


// Add zoom and rotation controls to the map.
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'bottom-right');

