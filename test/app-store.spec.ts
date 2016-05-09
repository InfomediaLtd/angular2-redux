import {it, describe, expect} from '@angular/testing';
import {AppStore} from "../src/app-store";
import {createStore} from "redux";
import {Observable} from 'rxjs/Observable';


const createSimpleAppStore = () => {
  return new AppStore(createStore((state: number = 0, action): number => {
      if (action.type === "inc") {
        return state + 1;
      } else {
        return state;
      }
  }));
}

export function main() {

  describe('Dispatching Actions', () => {

    it('subscription is called when dispatching actions', () => {

      const appStore:AppStore = <AppStore>createSimpleAppStore();

      let testCounter = 0;
      appStore.subscribe(state => testCounter = state);

      appStore.dispatch({type:"inc"});
      expect(testCounter).toEqual(1);

    });

    it('createDispatcher works as expected', () => {

      const appStore:AppStore = <AppStore>createSimpleAppStore();

      let testCounter = 0;
      appStore.subscribe(state => testCounter = state);

      const dispatcher = appStore.createDispatcher(() => ({type:"inc"}));
      dispatcher();
      dispatcher();
      expect(testCounter).toEqual(2);

    });

  });

  describe('Observable', () => {

      it('returned by select()', () => {
          const appStore = createSimpleAppStore();
          const state$ = appStore.select(state => state);
          expect(state$).toImplement(Observable);
      });

      it('contains initial state', () => {
          const appStore = createSimpleAppStore();
          let currentState;

          appStore.select(state => state)
              .subscribe(state => currentState = state);

          expect(currentState).toEqual(0);
      });

      it('updates on dispatch', () => {
          const appStore = createSimpleAppStore();
          let currentState;

          appStore.select(state => state)
              .subscribe(state => currentState = state);

          appStore.dispatch({type:"inc"});

          expect(currentState).toEqual(1);
      })

      it('maps with given selector function', () => {
          const appStore = createSimpleAppStore();
          const selector = jasmine.createSpy().and.callFake(state => state * state);
          let currentState;

          appStore.select(selector)
              .subscribe(state => currentState = state);

          appStore.dispatch({type:"inc"});
          expect(currentState).toEqual(1);

          appStore.dispatch({type:"inc"});
          expect(currentState).toEqual(4);

          expect(selector.calls.count()).toBe(3);
      });

      it('maps with given key string', () => {
          interface NestedState {foo: number}
          const appStore = new AppStore(createStore((state: NestedState = {foo: 0}, action) => {
              if (action.type === "inc") {
                return {foo: state.foo + 1};
              } else {
                return state;
              }
          }));
          let currentState;

          appStore.select('foo')
              .subscribe(state => currentState = state);

          appStore.dispatch({type:"inc"});
          expect(currentState).toEqual(1);

          appStore.dispatch({type:"inc"});
          expect(currentState).toEqual(2);
      });

      it('did not emit when selector returns equal values', () => {
          const appStore = createSimpleAppStore();
          const sameInstance = {};
          const selector = jasmine.createSpy().and.returnValue(sameInstance);
          const listener = jasmine.createSpy().and.callFake(state => currentState = state);
          let currentState;

          appStore.select(selector)
              .subscribe(listener);

          appStore.dispatch({type:"inc"});
          appStore.dispatch({type:"inc"});
          expect(currentState).toEqual(sameInstance);

          expect(selector.calls.count()).toBe(3);
          expect(listener.calls.count()).toBe(1);
      });
  });

};
