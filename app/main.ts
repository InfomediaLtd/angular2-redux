import "zone.js";
import "reflect-metadata";
import "bootstrap/css/bootstrap.css!css"

import {bootstrap} from "@angular/platform-browser-dynamic";
import {provide} from "@angular/core";
import {AppComponent} from "./app";
import {AppStore,createAppStoreFactoryWithOptions} from "../src/index";

import counterReducer from "./counter-reducer"
import {CounterActions} from "./counter-actions";

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
const appStoreFactory = createAppStoreFactoryWithOptions({
                          reducers:counterReducer,
                          additionalMiddlewares:[logger],
                          debug:true
                        });

bootstrap(AppComponent,
    [
        provide(AppStore, { useFactory: appStoreFactory }),
        CounterActions
    ]);

/* tslint:disable */
// polyfill for Object.assign (not part of TS yet)
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (!Object.assign) {
    Object.defineProperty(Object, "assign", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target) {
            "use strict";
            if (target === undefined || target === null) {
                throw new TypeError("Cannot convert first argument to object");
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }
                nextSource = Object(nextSource);

                var keysArray = Object.keys(nextSource);
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}
