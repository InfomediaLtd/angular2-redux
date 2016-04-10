import {AppStore} from "./app-store";
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import * as thunkMiddleware from "redux-thunk"

/* tslint:disable */
export function applyDevTools(debug) {
  // default to window query param
  let isDebug = false;
  // allow overriding with a boolean or function
  if (debug == undefined) {
     isDebug = window && !!window.location.href.match(/[?&]debug=([^&]+)\b/)
   } else {
      if (debug instanceof Function) {
        isDebug = debug();
      } else {
        isDebug = debug;
      }
  }
  // config the dev tools extension is installed
  isDebug = isDebug && window && window["devToolsExtension"];

  // only apply is dev tools is installed
  return isDebug ? window["devToolsExtension"]() : f => f;
}
/* tslint:enable */

/**
 * Factory for app store
 */
export function createAppStoreFactory(reducers?, additionalMiddlewares?) {
  return createAppStoreFactoryWithOptions({
           reducers,
           additionalMiddlewares
         })
}

export function createAppStoreFactoryWithOptions({
                    reducers,
                    additionalMiddlewares = [],
                    debug = undefined
                  }) {

    return () => {

        // Figure out reducers
        let reducersToUse = reducers;
        if (typeof reducersToUse === "object") {
            // it's not a single reducer so we need to combine the reducers on the object properties
            reducersToUse = combineReducers(reducersToUse);
        }

        let thunkMiddlewareToUse = thunkMiddleware;
        // Fix for import issues
        if (thunkMiddlewareToUse && thunkMiddlewareToUse["default"]) {
            thunkMiddlewareToUse = thunkMiddlewareToUse["default"];
        }

        const middlewareEnhancer = applyMiddleware(thunkMiddlewareToUse,...additionalMiddlewares);
        const enhancers = compose(middlewareEnhancer, applyDevTools(debug));
        const createStoreWithEnhancers = enhancers(createStore);

        const reduxAppStore = createStoreWithEnhancers(reducersToUse);
        // const reduxAppStore = createStore(reducers, undefined, enhancers); // new API (not typed yet)

        return new AppStore(reduxAppStore);

    }
};
