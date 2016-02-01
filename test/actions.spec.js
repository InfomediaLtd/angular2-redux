var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var testing_1 = require('angular2/testing');
var actions_1 = require("../src/actions");
var app_store_1 = require("../src/app-store");
var SomeActions = (function (_super) {
    __extends(SomeActions, _super);
    function SomeActions() {
        _super.apply(this, arguments);
    }
    SomeActions.prototype.someAction1 = function (data) { return { type: "1", data: data }; };
    SomeActions.prototype.someAction2 = function (data) { return { type: "2", data: data }; };
    return SomeActions;
})(actions_1.Actions);
var createAppStoreMock = function () {
    app_store_1.AppStore;
    appStoreMock = new app_store_1.AppStore({});
    spyOn(appStoreMock, "dispatch");
    return appStoreMock;
};
function main() {
    testing_1.describe('Actions', function () {
        testing_1.it('should create dispatcher function', function () {
            var someActions = new SomeActions();
            var dispatcherFunction = someActions.createDispatcher(createAppStoreMock(), someActions.someAction1);
            testing_1.expect(dispatcherFunction()).toEqual(undefined);
        });
        testing_1.it('dispatcher function should work', function () {
            var someActions = new SomeActions();
            app_store_1.AppStore;
            appStoreMock = createAppStoreMock();
            var dispatcherFunction = someActions.createDispatcher(appStoreMock, someActions.someAction1);
            dispatcherFunction("a");
            dispatcherFunction("b");
            var dispatchSpy = appStoreMock.dispatch;
            testing_1.expect(dispatchSpy).toHaveBeenCalled();
            testing_1.expect(dispatchSpy.calls.count()).toEqual(2);
            testing_1.expect(dispatchSpy.calls.argsFor(0)[0]).toEqual({ type: "1", data: "a" });
            testing_1.expect(dispatchSpy.calls.argsFor(1)[0]).toEqual({ type: "1", data: "b" });
            someActions.createDispatcher(appStoreMock, someActions.someAction2)("c");
            testing_1.expect(dispatchSpy.calls.argsFor(2)[0]).toEqual({ type: "2", data: "c" });
        });
    });
}
exports.main = main;
;
//# sourceMappingURL=actions.spec.js.map