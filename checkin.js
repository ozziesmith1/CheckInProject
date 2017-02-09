let lat;
let lng;

function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    lat = latitude;
    lng = longitude;
    initMap();

    const queryEndpoint = `https://docs.google.com/forms/d/e/1FAIpQLSdmqldF2qWeNB63aORpAx6eyzPL_nY9dVoYoO5Q1aC7Rn6hIw/formResponse?entry.169344923=${lat}&entry.1731324848=${lng}`

    const xhr = new XMLHttpRequest()
    xhr.open('GET', queryEndpoint, true)
    xhr.send()
    
    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);

}

function initMap() {
  var uluru = {lat: lat, lng: lng};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}
