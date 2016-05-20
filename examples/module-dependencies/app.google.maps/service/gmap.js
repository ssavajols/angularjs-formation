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

                    this.addInfoWindow(name, position, "Vous êtes ici !");
                    this.maps[name].setCenter(position);
                }.bind(this));
            }
        };

        /**
         *
         * @param name
         * @param markers
         */
        this.addMarkers = function(name, markers){
            var self = this;

            for(var index = 0; index < markers.length; index++ ){
                (function(marker, map){
                    googleMapsServiceGeocoder.address(marker).then(function(results){
                        for(var index = 0; index<results.length; index++){
                            var marker = new google.maps.Marker({
                                position: results[index].geometry.location,
                                map: map,
                                label: (index+1).toString(),
                                title: results[index].formatted_address
                            });

                            marker.addListener("click", function(){
                                self.addInfoWindow(name, this.position, "<a href='#'>"+this.title+"</a>");
                            })
                        }
                    });
                })(markers[index], this.maps[name])

            }

        };

        /**
         *
         * @param name
         * @param position
         * @param content
         */
        this.addInfoWindow = function(name, position, content){
            var infoWindow = new google.maps.InfoWindow({map: this.maps[name]});

            infoWindow.setPosition(position);
            infoWindow.setContent(content);

            return infoWindow;
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