var services  = (function ($) {
    var services = {};

    var caseEncodeURIComponent = function (str) {
       return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
	   return '%' + c.charCodeAt(0).toString(16);
       });
    };

    var makeUrl = function (resource, params, datatype) {
	var url = '/api/' + caseEncodeURIComponent(resource);
        return (params) ? url + '?' + $.param(params) : url;
    };

    services.get = function (resource, params, type) {
        // if the argument params is not passed, then shift dataType to one argument left
        if (!(typeof params === "object")) {
	    if (!type) {
		type = params || "json";
	    }	
	    params == undefined;
	}
        var dataType = type.toLowerCase().match(/^(json|html|xml|script)$/g) || "json";    
	var resourceUrl = makeUrl(resource, params);    
        return $.ajax({
	    url: resourceUrl
          , type: "GET"
          , dataType: dataType
         });
    };

    return services;
} (jQuery));
