var handlebars = require('handlebars')
  , fs = require('fs')
  , path = require('path')
  ;

exports.registerPartials = function (directory) {
 
        var registerFile = function (fname, index, files) {
	    var isValidFileName = /\w\.(?:html|handlebars)$/.test(fname);
	    if (!isValidFileName) {
		return;
	    }
	    
	    var file = path.join(directory, fname);
	    fs.readFile(file, 'utf8', function (err, data) {
		if (!err) {
                    var templateName = path.basename(file, path.extname(file));
		    handlebars.registerPartial(templateName, data);
		}
	    });
        
        };

	fs.readdir(directory, function (err, files) {
	    if (!err) {
		files.forEach(registerFile);
            }
        });
};

exports.registerHelpers = function() {
    handlebars.registerHelper('ifBelongsToCategory', function(parent, options) {
	if (this.category_id == parent.id) {
	    return options.fn(this);
	}
    });
};
