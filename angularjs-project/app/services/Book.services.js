app.service("BookService", function ($http, API_URL) {
    var apiUrl = API_URL + "books";

    this.getBooks = function () {
        return $http.get(apiUrl)
            .then(response => response.data)
            .catch(error => {
                console.error("Lỗi khi gọi API:", error);
                throw error;
            });
    };
});
