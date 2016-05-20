angular.module("app.google.maps.directive.gmap", [])
    .directive('gmap', function(googleMapsServiceGmap){
      
        return {
            restrict: "E",
            replace: true,
            scope:{
                "currentPosition": "=",
                "markers": "=",
                "disableDefaultUi": "=",
                "zoom": "@"
            },
            template: "<div class='gmap'></div>",
            /**
             *
             * @param elements
             * @param attrs
             */
            compile: function(elements, attrs){
                attrs["map-name"] = "gmap-"+~~(Math.random()*10000000);
                elements.addClass("loading");
            },
            /**
             *
             * @param $scope
             * @param $element
             * @param $attrs
             */
            controller: function($scope, $element, $attrs){
                var mapName = $attrs["map-name"];
                var mapOptions = {
                    center: {lat: -34.397, lng: 150.644},
                    zoom: $scope.zoom || 8,
                    disableDefaultUI: typeof $attrs["disableDefaultUi"] !== "undefined"
                };

                $scope.$watch("zoom", function(value){
                    if( googleMapsServiceGmap.maps[mapName] && value > 0)
                        googleMapsServiceGmap.maps[mapName]
                            .setZoom(parseInt(value, 10));
                });

                googleMapsServiceGmap
                    .createMap(mapName, $element[0], mapOptions);
                
                $element.removeClass("loading");
                
                if( $scope.currentPosition ){
                    googleMapsServiceGmap
                        .setCurrentPosition(mapName);
                }
                
                if( $scope.markers && $scope.markers.length ){
                    googleMapsServiceGmap
                        .addMarkers(mapName, $scope.markers);
                }

                $scope.$on("$destroy", function(){
                    googleMapsServiceGmap
                        .destroyMap(mapName);
                });
            }
        }
        
    })