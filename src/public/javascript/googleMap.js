let marker
let map
let infoWindow

function centerToUserPosition() {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(pos);
        map.setZoom(10)
      },
      () => {
        // geolocation disallowed by user
      }
    );
  } else {
    // Browser doesn't support Geolocation
  }
}

function initMap() {
  const longitudeInput = document.getElementsByName('locationLongitude')[0]
  const latitudeInput = document.getElementsByName('locationLatitude')[0]
  const lat = parseFloat(latitudeInput.value || 0)
  const lng = parseFloat(longitudeInput.value || 0)
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: { lat, lng },
  });
  
  if (lat || lng) {
    latLng = new google.maps.LatLng(lat, lng)
    marker = new google.maps.Marker({ map, position: latLng })
    map.setCenter({ lat, lng });
    map.setZoom(10)
  } else {
    centerToUserPosition()
  }
  
  const isEdit = !!document.getElementsByTagName('form').length
  if (isEdit) {
    map.addListener("click", ({ latLng }) => {
      if (marker) {
        marker.setMap(null)
      }
      marker = new google.maps.Marker({ map, position: latLng })
      longitudeInput.setAttribute('value', latLng.lng())
      latitudeInput.setAttribute('value', latLng.lat())
    });
  }
}
