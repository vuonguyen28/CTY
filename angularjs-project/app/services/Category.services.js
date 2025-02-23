app.service("CategoryService", function ($http, API_URL) {
  var categoryUrl = API_URL + "categories";
  var publisherUrl = API_URL + "publishers";

  this.getCategory = function () {
    return $http
      .get(categoryUrl)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  };

  this.getPublisher = function () {
    return $http
      .get(publisherUrl)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  };
});
