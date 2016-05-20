angular.module("app.google.maps", 
    [
        "app.google.maps.service.geocoder",
        "app.google.maps.service.gmap",
        "app.google.maps.service.marker",
        "app.google.maps.directive.gmap"
    ])
    .constant("GEOPORTAIL_GEOCODER", false)
