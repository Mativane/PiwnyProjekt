// Najpierw nadajemy nasz access token, czyli mapboxowe uwierzytelnienie konta
// Więc o access tokenie tu: https://docs.mapbox.com/help/how-mapbox-works/access-tokens
mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fyb2xib2IiLCJhIjoiY2p2eGdjNHc1MDNrbTQ4bndreHZheWhrZyJ9.EqSz6y7M7GsG53TRswocTg';

//Tworzymy nowy obiekt o nazwie map, za pomocą funkcji pobranej z mapboxa
const map = new mapboxgl.Map({
    // Nadajemy mu kontener, czyli to gdzie ma się pojawiać. 
    // To 'map' nawiązuje do "ID = 'map'" w <div> w pliku index.html
  container: 'map',
    // Style odpowiada za połączenie się do "dobrej" mapy z mapbox studio
    // W naszym przypadku - tej stworzonej przez Karola z zamieszczonymi punktami pubów
  style: 'mapbox://styles/karolbob/cjvzea29017gx1cmv4qy7plef',
    // Centrowanie i zoom odpowiada za ustawienie perseptywy w której wczytuje się mapa
  center: [16.939,52.408],
  zoom: 15.50
});