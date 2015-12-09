/**
 * Wrapper for app store
 */
var AppStore = (function () {
    function AppStore(store) {
        this.getState = function () {
            return store.getState();
        };
        this.subscribe = function (subscribeFunction) {
            // decorate the subscription with the state passed in as a parameter
            return store.subscribe(function () { return subscribeFunction(store.getState()); });
        };
        this.dispatch = function (action) {
            return store.dispatch(action);
        };
    }
    return AppStore;
})();
exports.AppStore = AppStore;
//# sourceMappingURL=app-store.js.map