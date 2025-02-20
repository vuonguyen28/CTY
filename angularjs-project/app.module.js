var app = angular.module("myApp", ["ngRoute"]);

app.constant("API_URL", "http://127.0.0.1:8000/api/");

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/Views/home.html",
            controller: "MainController"
        })
        .when("/first-msg",{
            template: "<strong> Hello there </strong>",
        })
        .when("/product/:id", {
            templateUrl: "app/Views/product-detail.html",
            controller: "ProductDetailController"
        })
        .otherwise({
            redirectTo: "/"
        });
});
