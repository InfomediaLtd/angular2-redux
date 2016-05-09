import {it, describe, expect} from '@angular/testing';
import {Actions} from "../src/actions";
import {AppStore} from "../src/app-store";
import {createStore} from 'redux'

class SomeActions extends Actions {
    someAction1(data) { return {type:"1",data} }
    someAction2(data) { return {type:"2",data} }
}
class SomeMoreActions extends Actions {
    constructor(appStore:AppStore) { super(appStore) }
    someAction(data) { return {type:"a",data} }
}
const createAppStoreMock = () => {
  const appStoreMock:AppStore = new AppStore(createStore(state => state));
  spyOn(appStoreMock, "dispatch");
  return appStoreMock;
}

export function main() {

  describe('Actions', () => {

    it('should create dispatcher function', () => {
      var someActions = new SomeActions();
      const dispatcherFunction = someActions.createDispatcher(
        someActions.someAction1,createAppStoreMock()
      );
      expect(dispatcherFunction()).toEqual(undefined);
    });

    it('dispatcher function should work', () => {

      var someActions = new SomeActions();

      let appStoreMock:AppStore = <AppStore>createAppStoreMock();
      const dispatcherFunction = someActions.createDispatcher(
        someActions.someAction1,appStoreMock
      );

      dispatcherFunction("a");
      dispatcherFunction("b");

      const dispatchSpy = appStoreMock.dispatch;
      expect(dispatchSpy).toHaveBeenCalled();
      expect(dispatchSpy.calls.count()).toEqual(2);
      expect(dispatchSpy.calls.argsFor(0)[0]).toEqual({type: "1",data: "a"});
      expect(dispatchSpy.calls.argsFor(1)[0]).toEqual({type: "1",data: "b"});

      someActions.createDispatcher(someActions.someAction2,appStoreMock)("c");
      expect(dispatchSpy.calls.argsFor(2)[0]).toEqual({type: "2",data: "c"});

    });

    it('dispatcher function should work with injected app store', () => {

      let appStoreMock:AppStore = <AppStore>createAppStoreMock();
      var someActions = new SomeMoreActions(appStoreMock);
      const dispatcherFunction = someActions.createDispatcher(someActions.someAction);

      dispatcherFunction("yo");

      const dispatchSpy = appStoreMock.dispatch;
      expect(dispatchSpy).toHaveBeenCalled();
      expect(dispatchSpy.calls.count()).toEqual(1);
      expect(dispatchSpy.calls.argsFor(0)[0]).toEqual({type: "a",data: "yo"});
    });
  });

};
