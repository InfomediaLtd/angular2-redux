import {it, describe, expect} from 'angular2/testing';
import {AppStore} from "../src/app-store";
import {createStore} from "redux";


const createSimpleAppStore = () => {
  return new AppStore(createStore((state=0,action) => {
      if (action.type=="inc") {
        return state+1;
      } else {
        return state;
      }
  }));
}

export function main() {

  describe('Actions', () => {

    it('subscription is called when dispatching actions', () => {

      AppStore appStore = createSimpleAppStore();

      let testCounter = 0;
      appStore.subscribe(state => testCounter = state);

      appStore.dispatch({type:"inc"});
      expect(testCounter).toEqual(1);

    });

    it('createDispatcher works as expected', () => {

      AppStore appStore = createSimpleAppStore();

      let testCounter = 0;
      appStore.subscribe(state => testCounter = state);

      const dispatcher = appStore.createDispatcher(() => ({type:"inc"}));
      dispatcher();
      dispatcher();
      expect(testCounter).toEqual(2);

    });

  });

};
