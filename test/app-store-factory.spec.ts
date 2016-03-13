import {it, describe, expect} from 'angular2/testing';
import {AppStore} from "../src/app-store";
import {createAppStoreFactory,createAppStoreFactoryWithOptions,applyDevTools} from "../src/app-store-factory";

const reducer = (state=0,action) => {
    if (action.type=="inc") {
      return state+1;
    } else {
      return state;
    }
};

export function main() {

  describe('applyDevTools', () => {

    it('applies debug options properly', () => {

      const wrapper = {
        devToolsMiddleware: ()=>{}
      };
      spyOn(wrapper, "devToolsMiddleware");
      const devToolsMiddlewareSpy = wrapper.devToolsMiddleware;

      window["devToolsExtension"]= ()=>wrapper.devToolsMiddleware;

      // specifying debug option
      applyDevTools(true)();
      expect(devToolsMiddlewareSpy.calls.count()).toEqual(1);
      applyDevTools(false)();
      expect(devToolsMiddlewareSpy.calls.count()).toEqual(1);

      // using function to specify debug option
      applyDevTools(()=>true)();
      expect(devToolsMiddlewareSpy.calls.count()).toEqual(2);
      applyDevTools(()=>false)();
      expect(devToolsMiddlewareSpy.calls.count()).toEqual(2);

      // not specifying
      applyDevTools()();
      expect(devToolsMiddlewareSpy.calls.count()).toEqual(2);
      applyDevTools(undefined)();
      expect(devToolsMiddlewareSpy.calls.count()).toEqual(2);
      applyDevTools(null)();
      expect(devToolsMiddlewareSpy.calls.count()).toEqual(2);

  });

  describe('createAppStoreFactoryWithOptions', () => {

    it('returns a function that creates an AppStore', () => {
        const f = createAppStoreFactory(reducer);
        const appStore = f();
        expect(typeof appStore).toEqual("object");
        appStore.dispatch({type:"inc"});
        expect(appStore.getState()).toEqual(1);
    });

    it('Supports multiple reducers', () => {
        const f = createAppStoreFactoryWithOptions({reducers:{a:reducer,b:reducer}});
        const appStore = f();
        appStore.dispatch({type:"inc"});
        expect(appStore.getState()).toEqual({a:1,b:1});
    });

    it('Supports thunks', () => {
        const f = createAppStoreFactoryWithOptions({reducers:reducer});
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

        const f = createAppStoreFactoryWithOptions({
                    reducers:reducer,
                    additionalMiddlewares: [logger]
                  });
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
