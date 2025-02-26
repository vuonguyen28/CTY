app.controller(
  "bookController",
  function ($scope, $rootScope, $location, BookService, CategoryService) {
    $scope.sortColumn = "-title";
    BookService.getBooks()
      .then(function (data) {
        $scope.books = data;
        console.log("Dữ liệu sách:", data);
      })
      .catch(function (error) {
        console.error("Lỗi khi tải danh sách sách:", error);
      });

    if (!$rootScope.categories) {
      CategoryService.getCategory()
        .then(function (data) {
          $rootScope.categories = data;
        })
        .catch(function (error) {
          console.error("Lỗi khi tải danh mục:", error);
        });
    }

    if (!$rootScope.publishers) {
      CategoryService.getPublisher()
        .then(function (data) {
          $rootScope.publishers = data;
          console.log("Danh sách nhà xuất bản:", data);
        })
        .catch(function (error) {
          console.error("Lỗi khi tải nhà xuất bản:", error);
        });
    }

    $scope.goToAddProduct = function () {
      $location.path("/addProduct");
    };
    $scope.goToHome = function () {
      $location.path("/");
    };

    //price filter
    $scope.priceFilter = 100000;
    $scope.priceFilterFn = function (book){
      return book.price <= $scope.priceFilter;
    }

    //Show modal edit book
    $scope.showModalEditProduct = function(id){
      BookService.getBookByID(id)
      .then(function (data) {
        $scope.bookEdit = data;
        console.log("Dữ liệu sách theo ID:", data);

        //Show modal
        var myModalEditBook = new bootstrap.Modal(
          document.getElementById("editBook"),{}
        )
        myModalEditBook.show();
        //Delete backdrop
        document
          .getElementById("editBook")
          .addEventListener("hidden.bs.modal", function () {
            document
              .querySelectorAll(".modal-backdrop")
              .forEach((el) => el.remove());
          });
      })
      .catch(function (error) {
        console.error("Lỗi khi tải sách theo ID:", error);
      });
    };

    $scope.getBookByID = function (id) {
      BookService.getBookByID(id)
        .then(function (data) {
          $scope.book = data;
          console.log("Dữ liệu sách theo ID:", data);

          //Show modal
          var myModal = new bootstrap.Modal(
            document.getElementById("bookModal"),
            {}
          );
          myModal.show();
          //Delete backdrop
          document
            .getElementById("bookModal")
            .addEventListener("hidden.bs.modal", function () {
              document
                .querySelectorAll(".modal-backdrop")
                .forEach((el) => el.remove());
            });
        })
        .catch(function (error) {
          console.error("Lỗi khi tải sách theo ID:", error);
        });
    };

    $scope.book = {};
    $scope.imageFile = null;

    // Xử lý khi chọn ảnh
    $scope.previewImage = function () {
      if ($scope.book.imageFile) {
        let reader = new FileReader();
        reader.onload = function (e) {
          $scope.$apply(() => {
            $scope.book.imagePreview = e.target.result;
          });
        };
        reader.readAsDataURL($scope.book.imageFile);
      }
    };

  
    

    $scope.book = {};
    $scope.imageFile = null;

    // Gửi dữ liệu lên Laravel API thông qua BookService
    $scope.addBook = function () {
      console.log("Hàm addBook() được gọi", $scope.book);

      if ($scope.myForm.$valid) {
        // Tạo FormData để gửi file ảnh và các trường khác
        var formData = new FormData();
        formData.append("title", $scope.book.title);
        formData.append("price", $scope.book.price);
        formData.append("published_year", $scope.book.published_year);
        formData.append("page_count", $scope.book.page_count);
        formData.append("category_id", $scope.book.category_id);
        formData.append("publisher_id", $scope.book.publisher_id);
        formData.append("description", $scope.book.description);

        // Nếu có file ảnh, bạn có thể thêm nó vào FormData (nếu cần)
        if ($scope.book.imageFile) {
          formData.append("image", $scope.book.imageFile);
          console.log("Đã gán file ảnh:", $scope.book.imageFile);
        } else {
          console.warn("Không có file ảnh!");
        }

        // Gọi hàm addBook từ BookService
        BookService.addBook(formData)
          .then(function (response) {
            console.log("Thêm sách thành công:", response);
            alert("Thêm sách thành công!");
            $scope.book = {};
            $location.path("/");
          })
          .catch(function (error) {
            console.error("Lỗi khi thêm sách:", error);
            alert("Thêm sách thất bại!");
          });
      } else {
        alert("Vui lòng điền đầy đủ thông tin!");
      }
    };

    // Xóa form
    $scope.resetForm = function () {
      $scope.book = {};
      $scope.imageFile = null;
      $scope.book.imagePreview = null;
    };

    //edit product
    $scope.editProductByID = function(bookData){
      if(!bookData || !bookData.id ){
        alert("khong tim thay danh sach cap nhat")
        
      }

      var formData = new FormData();
        formData.append("title", $scope.book.title);
        formData.append("price", $scope.book.price);

        BookService.updateBook($scope.book.id, formData)
          .then(function (response) {
            console.log("Cập nhật sách thành công:", response);
            alert("Cập nhật sách thành công!");
          })
          .catch(function (error) {
            alert("Cập nhật thất bại!");
          });
        }
  }
);
