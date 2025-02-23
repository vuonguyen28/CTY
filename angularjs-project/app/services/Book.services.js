app.service("BookService", function ($http, API_URL) {
  var apiUrl = API_URL + "books";

  this.getBooks = function () {
    return $http
      .get(apiUrl)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  };
  this.getBookByID = function (id) {
    console.log("id data:", id);
    return $http
      .get(apiUrl + "/" + id)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  };

  this.addBook = function (bookData) {
    return $http
      .post(apiUrl, bookData, {
        headers: { "Content-Type": undefined },
        transformRequest: angular.identity,
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  };
});
