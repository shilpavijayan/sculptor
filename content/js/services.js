var services  = (function ($) {
    var services = {};

    var caseEncodeURIComponent = function (str) {
       return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
	   return '%' + c.charCodeAt(0).toString(16);
       });
    };

    var makeUrl = function (resource, params) {
	var url = '/api/' + caseEncodeURIComponent(resource);
        return (params) ? url + '?' + $.param(params) : url;
    };

    // TODO: specify dataType to retrieve specific data type json, html etc.
    services.get = function (resource, params) {
	var resourceUrl = makeUrl(resource, params);
        return $.ajax({
	    url: resourceUrl
          , type: "GET"
          , dataType: "json"
         });
    };

    return services;
} (jQuery));
