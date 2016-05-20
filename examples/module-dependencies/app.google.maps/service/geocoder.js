angular.module("app.google.maps.service.geocoder", [])
    /**
     *
     */
    .factory("googleMapsServiceGeocoder", function(GEOPORTAIL_GEOCODER, googleMapsServiceGoogleGeocoder, googleMapsServiceGeoportailGeocoder){
        return GEOPORTAIL_GEOCODER ? googleMapsServiceGeoportailGeocoder : googleMapsServiceGoogleGeocoder;
    })
    /**
     * @function googleMapsServiceGoogleGeocoder
     * @class app.google.maps.service.geocoder
     * @description Google geocoding service
     */
    .service("googleMapsServiceGoogleGeocoder", function(GEOPORTAIL_GEOCODER, $q, $http){

        this.address = function(addr){
            var $deferred = $q.defer();

            $http({
                method: "GET",
                url: "https://maps.googleapis.com/maps/api/geocode/json?address="+encodeURI(addr),
                cache:true
            }).success(function(response){
                $deferred.resolve(response.results);
            }).error($deferred.reject);

            return $deferred.promise;
        }

    })
    /**
     * @function googleMapsServiceGeoportailGeocoder
     * @class app.google.maps.service.geocoder
     * @description Geoportail geocoding service
     */
    .service("googleMapsServiceGeoportailGeocoder", function($q, $http){

        this.address = function(addr){
            var $deferred = $q.defer();

            $http({
                method: "GET",
                url: "http://api-adresse.data.gouv.fr/search/?q="+encodeURI(addr),
                cache:true
            }).success(function(response){
                $deferred.resolve(response.features.map(formatAsGoogleGeocoder));
            }).error($deferred.reject);

            return $deferred.promise;
        };

        function formatAsGoogleGeocoder(value){

            var newValue = {
                "address_components" : [
                    {
                        "long_name" : value.properties.city,
                        "short_name" : value.properties.label,
                        "types" : [ value.properties.type ]
                    }
                ],
                "formatted_address" : value.properties.city+", France",
                "geometry" : {
                    "bounds" : {},
                    "location" : {
                        "lat" : value.geometry.coordinates[1],
                        "lng" : value.geometry.coordinates[0]
                    },
                    "location_type" : "APPROXIMATE",
                    "viewport" : {}
                },
                "place_id" : "",
                "types" : [ value.properties.type ]
            };

            return newValue;
        }

    })