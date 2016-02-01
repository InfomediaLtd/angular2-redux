var testing_1 = require('angular2/testing');
var app_store_1 = require("../src/app-store");
var redux_1 = require("redux");
var createSimpleAppStore = function () {
    return new app_store_1.AppStore(redux_1.createStore(function (state, action) {
        if (state === void 0) { state = 0; }
        if (action.type == "inc") {
            return state + 1;
        }
        else {
            return state;
        }
    }));
};
function main() {
    testing_1.describe('Actions', function () {
        testing_1.it('subscription is called when dispatching actions', function () {
            app_store_1.AppStore;
            appStore = createSimpleAppStore();
            var testCounter = 0;
            appStore.subscribe(function (state) { return testCounter = state; });
            appStore.dispatch({ type: "inc" });
            testing_1.expect(testCounter).toEqual(1);
        });
        testing_1.it('createDispatcher works as expected', function () {
            app_store_1.AppStore;
            appStore = createSimpleAppStore();
            var testCounter = 0;
            appStore.subscribe(function (state) { return testCounter = state; });
            var dispatcher = appStore.createDispatcher(function () { return ({ type: "inc" }); });
            dispatcher();
            dispatcher();
            testing_1.expect(testCounter).toEqual(2);
        });
    });
}
exports.main = main;
;
//# sourceMappingURL=app-store.spec.js.map