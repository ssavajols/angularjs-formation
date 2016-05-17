angular.module("app", [])

    .run(function($templateCache){
        $templateCache.put("./template.html", require("./template.html"));
    })

    .controller("myController", function($scope){
       $scope.name = "world";
    });