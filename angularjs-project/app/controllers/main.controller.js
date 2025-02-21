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

        $scope.getBookByID = function(id) {
            BookService.getBookByID(id)
                .then(function (data) {
                    $scope.book = data;
                    console.log("Dữ liệu sách theo ID:", data);
                    var myModal = new bootstrap.Modal(document.getElementById('bookModal'), {});
                    myModal.show();
                })
                .catch(function (error) {
                    console.error("Lỗi khi tải sách theo ID:", error);
                });
        };
});
