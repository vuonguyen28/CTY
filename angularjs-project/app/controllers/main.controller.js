app.controller("MainController", function ($scope, BookService) {
        $scope.sortColumn = '-title';
        BookService.getBooks()
        .then(function (data) {
            $scope.books = data; 
            console.log("Dữ liệu sách:", data); 
        })
        .catch(function (error) {
            console.error("Lỗi khi tải danh sách sách:", error);
        });
});
