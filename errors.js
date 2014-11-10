var ErrorTypes = {
    UnexpectedError : 'UnexpectedError',
    InternalError: 'InternalError',
    RangeError: 'RangeError',
    SyntaxError: 'SyntaxError',
    TypeError: 'TypeError',
    URIError: 'URIError',
    ResourceNotFoundError: 'ResourceNotFoundError',
    InvalidArgumentError: 'InvalidArgumentError',
    DataError: 'DataError',
    DefaultError: 'Error' 
};
var DefaultErrorMessage = 'An unexpected error occurred. Please try again.';
var DefaultLogMessage = 'An unexpected error occured. Check the error stack.';

function ApplicationError (e) {
    Error.call(this);
    this.name = e.name || ErrorTypes.DefaultError;
    this.message = e.message || DefaultErrorMessage;
    this.logMessage = e.logMessage || DefaultLogMessage;
    if (e.propertyName) {
	this.propertyName = e.propertyName;
    }

    if (e.propertyValue) {
	this.propertyValue = e.propertyValue;
    } 	
}
ApplicationError.prototype = new Error();
ApplicationError.prototype.constructor = ApplicationError;

exports.ApplicationError = ApplicationError;
exports.ErrorTypes = ErrorTypes;
