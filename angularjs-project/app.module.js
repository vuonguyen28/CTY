var app = angular.module("myApp", ["ngRoute"]);

app.constant("API_URL", "http://127.0.0.1:8000/api/");

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "./app/Views/user/product/index.html",
            controller: "MainController"
        })
        
});
