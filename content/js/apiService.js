angular.module('services', []);

/**
 *  The 'ProductPlatfomsSvc' service retrieves the platforms that the product is avalaible on. 
**/

services.factory('ProductPlatformsSvc', ['$http', function($http) {
    var ProductPlatformsSvc = {};
    ProductPlatformsSvc.apiUrl = '/api/platforms?id=';
    ProductPlatformsSvc.getProductPlatforms = function(pid) { 
       return $http.get(apiUrl + pid);
    };

    return ProductPlatformsSvc;
}]);


 

 