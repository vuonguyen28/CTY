var app = angular.module("myApp", ["ngRoute"]);

app.constant("API_URL", "http://127.0.0.1:8000/api/");

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "./app/Views/user/product/index.html",
      controller: "bookController",
    })
    .when("/addProduct", {
      templateUrl: "./app/Views/user/product/addProduct.html",
      controller: "bookController",
    });
});

app.directive('fileInput', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      element.bind('change', function() { 
        scope.$apply(function(){
          scope.bookEdit.imageFile = element[0].files[0];
        });
      });
    }
  };
});