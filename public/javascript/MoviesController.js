var app = angular.module("MovieCatalog", []);

app.controller("MoviesController", ['$http', '$scope', function ($http, $scope) {
    $http.get('/list')
    .success(function(oReturn) {
        $scope.movies = oReturn.movies;
    });

	function Movie() {
        this.name = '';
        this.director = '';
        this.year = '';
    };
    
    $scope.movie = new Movie();

	$scope.showMovie = function(movie) {
        $scope.selectedMovie = movie;
    };

	$scope.editMovie = function(movie) {
	    $scope.movie = movie;
	};

    $scope.deleteMovie = function(movie) {
        $http.delete('/movie/' + movie._id).success(function(err, oReturn) {
            $scope.selectedMovie = null;
            var index = $scope.movies.indexOf(movie);
            $scope.movies.splice(index, 1);
        });
    };

    function addMovie() {
		console.log($scope.movie)
		$http.post('/save', $scope.movie)
	    .success(function(oReturn) {
	        $scope.movies.push(oReturn);
            $scope.movie = new Movie();
	    });
    };

    $scope.sendMovie = function() {
	    if($scope.movie._id) {
	        updateMovie();
	    } else {
	        addMovie();
	    }
	}; 
	
	function updateMovie () {
	    $http.put('/movie', $scope.movie)
	    .success(function() {
	        $scope.movie = new Movie();
	    });
	};

    
}]);