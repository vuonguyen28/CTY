app.controller("categoryController", function ($rootScope, CategoryService) {
  CategoryService.getCategory()
    .then(function (data) {
      $rootScope.categories = data;
      console.log("Danh sách danh mục:", data);
    })
    .catch(function (error) {
      console.error("Lỗi khi tải danh mục:", error);
    });

  CategoryService.getPublisher()
    .then(function (data) {
      $rootScope.publishers = data;
      console.log("Danh sách nhà xuất bản:", data);
    })
    .catch(function (error) {
      console.error("Lỗi khi tải nhà xuất bản:", error);
    });
});
