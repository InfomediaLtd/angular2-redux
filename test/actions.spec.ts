import {it, describe, expect} from 'angular2/testing';
import {Actions} from "../src/actions";
import {AppStore} from "../src/app-store";

class SomeActions extends Actions {
    someAction1(data) { return {type:"1",data} }
    someAction2(data) { return {type:"2",data} }
}
const createAppStoreMock = () => {
  const appStoreMock:AppStore = new AppStore({});
  spyOn(appStoreMock, "dispatch");
  return appStoreMock;
}

export function main() {

  describe('Actions', () => {

    it('should create dispatcher function', () => {
      var someActions = new SomeActions();
      const dispatcherFunction = someActions.createDispatcher(
        createAppStoreMock(),
        someActions.someAction1
      );
      expect(dispatcherFunction()).toEqual(undefined);
    });

    it('dispatcher function should work', () => {

      var someActions = new SomeActions();

      let appStoreMock:AppStore = <AppStore>createAppStoreMock();
      const dispatcherFunction = someActions.createDispatcher(
        appStoreMock,
        someActions.someAction1
      );

      dispatcherFunction("a");
      dispatcherFunction("b");

      const dispatchSpy = appStoreMock.dispatch;
      expect(dispatchSpy).toHaveBeenCalled();
      expect(dispatchSpy.calls.count()).toEqual(2);
      expect(dispatchSpy.calls.argsFor(0)[0]).toEqual({type: "1",data: "a"});
      expect(dispatchSpy.calls.argsFor(1)[0]).toEqual({type: "1",data: "b"});

      someActions.createDispatcher(appStoreMock,someActions.someAction2)("c");
      expect(dispatchSpy.calls.argsFor(2)[0]).toEqual({type: "2",data: "c"});

    });
  });

};
