angular.module('controllers', ['services']);

controllers.controller('ProductPlatformsCtrl', ['$scope', 'ProductPlatformsSvc', function($scope, ProductPlatformsSvc) {
    $scope.productId = 0;
    $scope.getPlatforms  = function() {
	if (productId == 0) {
	    $scope.error = "Invalid product id." ;
	    return;
        }

	ProductPlatformsSvc.getProductPlatforms(productId).success(function(data, status, headers, config) {
	    if (data.error) {
		$scope.error = data.error;
	    } else {
		$scope.platforms = data;
	    }
	}).error(function(data, status, headers, config) {
	    $scope.error = "Error fetching product platforms.";
	});
    };	
}

