var Something = /** @class */ (function () {
    function Something() {
        this.a = 1;
        this.b = 2;
        this.events = externalEvents(this);
    }
    return Something;
}());
var externalFunction = function () {
    console.log(this.a);
};
var externalEvents = function (parent) {
    return {
        internalFunction: externalFunction.bind(parent)
    };
};
var something = new Something();
something.events.internalFunction();
