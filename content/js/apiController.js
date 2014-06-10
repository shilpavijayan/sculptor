var controllers = angular.module('controllers', ['services']);

controllers.controller('ProductPlatformsCtrl', ['$scope', 'ProductPlatformsSvc', function($scope, ProductPlatformsSvc) {
    $scope.getPlatforms  = function() {
	if (!$scope.productId || $scope.productId == '0') {
	    $scope.error = "Invalid product id." ;
	    return;
        }

	ProductPlatformsSvc.getProductPlatforms($scope.productId).success(function(data, status, headers, config) {
	    if (data.error) {
		$scope.error = data.error;
	    } else {
		$scope.platforms = data;
	    }
	}).error(function(data, status, headers, config) {
	    $scope.error = "Error fetching product platforms.";
	});
    };	
}]);

