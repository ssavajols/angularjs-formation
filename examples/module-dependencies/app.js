angular.module("app", ["app.google.maps"])
    .constant("GEOPORTAIL_GEOCODER", true)
    .controller("exemple", function($scope, $interval){
        $interval(function(){
            $scope.zoom = ~~(Math.random()*15)+1;
        }, 2000);
    })

    
