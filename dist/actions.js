/**
 * abstract class to provide utility methods for action creators
 */
var Actions = (function () {
    function Actions() {
    }
    Actions.prototype.createDispatcher = function (appStore, action) {
        var _this = this;
        return function () {
            var n = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                n[_i - 0] = arguments[_i];
            }
            return appStore.dispatch(action.call.apply(action, [_this].concat(n)));
        };
    };
    return Actions;
})();
exports.Actions = Actions;
//# sourceMappingURL=actions.js.map