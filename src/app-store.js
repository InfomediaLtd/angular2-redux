/**
 * Wrapper for app store
 */
var AppStore = (function () {
    function AppStore(store) {
        this.getState = function () {
            return store.getState();
        };
        this.subscribe = function (subscriber) {
            // decorate the subscriber with the state passed in as a parameter
            return store.subscribe(function () { return subscriber(store.getState()); });
        };
        this.dispatch = function (action) {
            return store.dispatch(action);
        };
        this.createDispatcher = function (actionCreator, context) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                return store.dispatch(actionCreator.call.apply(actionCreator, [context].concat(args)));
            };
        };
    }
    return AppStore;
})();
exports.AppStore = AppStore;
//# sourceMappingURL=app-store.js.map