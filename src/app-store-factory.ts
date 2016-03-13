import {AppStore} from "./app-store";
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import * as thunkMiddleware from "redux-thunk"

/**
 * Factory for app store
 */
export function createAppStoreFactory(reducers, additionalMiddlewares) {
  return createAppStoreFactoryWithOptions({reducers,additionalMiddlewares})
}
export function createAppStoreFactoryWithOptions({
                    reducers = {},
                    additionalMiddlewares = [],
                    debug = undefined
                  }) {

    // Figure out reducers
    let reducersToUse = reducers;
    if (typeof reducersToUse === "object") {
        // it's not a single reducer so we need to combine the reducers on the object properties
        reducersToUse = combineReducers(reducersToUse);
    }

    // Check if we need to turn on debugging
    /* tslint:disable */
    // default to window query param
    let isDebug = window && window.location.href.match(/[?&]debug=([^&]+)\b/) && window["devToolsExtension"];
    // allow overriding with a boolean or function
    if (debug != undefined) {
        if (debug instanceof Function) {
          isDebug = debug();
        } else {
          isDebug = debug;
        }
    }
    // only apply is dev tools is installed
    const applyDevTools = () => isDebug ? window && window["devToolsExtension"]() : f => f;
    /* tslint:enable */


    return () => {

        let thunkMiddlewareToUse = thunkMiddleware;
        // Fix for import issues
        if (thunkMiddlewareToUse && thunkMiddlewareToUse.default) {
            thunkMiddlewareToUse = thunkMiddlewareToUse.default;
        }

        const middlewareEnhancer = applyMiddleware(thunkMiddlewareToUse,...additionalMiddlewares);
        const enhancers = compose(middlewareEnhancer, applyDevTools());
        const createStoreWithEnhancers = enhancers(createStore);

        const reduxAppStore = createStoreWithEnhancers(reducersToUse);
        // const reduxAppStore = createStore(reducers, undefined, enhancers); // new API (not typed yet)

        return new AppStore(reduxAppStore);

    }
};
