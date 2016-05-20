angular.module("app.google.maps.service.gmap", [])

    /**
     * 
     */
    .service("googleMapsServiceGmap", function(googleMapsServiceGeocoder){
        this.maps = {};

        /**
         *
         * @param name
         */
        this.setCurrentPosition = function(name){
            if( 'geolocation' in navigator){
                navigator.geolocation.getCurrentPosition(function(position){
                    var position = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    var infoWindow = new google.maps.InfoWindow({map: this.maps[name]});

                    this.maps[name].setCenter(position);
                    infoWindow.setPosition(position);
                    infoWindow.setContent("Vous êtes ici !");
                }.bind(this));
            }
        };

        /**
         *
         * @param name
         * @param markers
         */
        this.addMarkers = function(name, markers){

            for(var index = 0; index < markers.length; index++ ){
                (function(marker, map){
                    googleMapsServiceGeocoder.address(marker).then(function(results){
                        for(var index = 0; index<results.length; index++){
                            new google.maps.Marker({
                                position: results[index].geometry.location,
                                map: map,
                                title: results[index].geometry.formatted_address,
                            });
                        }
                    });
                })(markers[index], this.maps[name])

            }

        };

        /**
         *
         * @param name
         * @param element
         * @param options
         * @returns {google.maps.Map}
         */
        this.createMap = function(name, element, options){
            return this.maps[name] = new google.maps.Map(element, options);
        };

        /**
         *
         * @param name
         */
        this.destroyMap = function(name){
            delete this.maps[name];
        };

    })