import {it, describe, expect} from 'angular2/testing';
import {AppStore} from "../src/app-store";
import {createAppStoreFactory} from "../src/app-store-factory";

const reducer = (state=0,action) => {
    if (action.type=="inc") {
      return state+1;
    } else {
      return state;
    }
};

export function main() {

  describe('createAppStoreFactory', () => {

    it('returns a function that creates an AppStore', () => {
        const f = createAppStoreFactory(reducer);
        const appStore = f();
        expect(typeof appStore).toEqual("object");
        appStore.dispatch({type:"inc"});
        expect(appStore.getState()).toEqual(1);
    });

    it('Supports multiple reducers', () => {
        const f = createAppStoreFactory({a:reducer,b:reducer});
        const appStore = f();
        appStore.dispatch({type:"inc"});
        expect(appStore.getState()).toEqual({a:1,b:1});
    });

    it('Supports thunks', () => {
        const f = createAppStoreFactory(reducer);
        const appStore = f();
        appStore.dispatch((dispatch) => {
            dispatch({type:"inc"});
            dispatch({type:"inc"});
        });
        expect(appStore.getState()).toEqual(2);
    });

    it('Supports additional middleware', () => {

        let counterInsideLogger = 0;
        const logger = store => next => action => {
          counterInsideLogger++;
          return next(action);
        }

        const f = createAppStoreFactory(reducer, [logger]);
        const appStore = f();
        appStore.dispatch((dispatch) => {
            dispatch({type:"inc"});
            dispatch({type:"inc"});
        });
        expect(appStore.getState()).toEqual(2);
        expect(counterInsideLogger).toEqual(2);
    });

  });

};
