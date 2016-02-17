import {AppStore} from "./app-store";

/**
 * Abstract class to provide utility methods for action creators
 */
export class Actions {

    private appStore:AppStore = null;

    constructor(appStore?:AppStore) {
        if (appStore) {
          this.appStore = appStore;
        }
    }

    public createDispatcher(action:(...n:any[])=>any, appStore?:AppStore):(...n)=>void {
        if (!appStore && !this.appStore) {
          throw new Error("Can't find AppStore for dispatching action");
        }
        appStore = appStore || this.appStore;
        return (...n)=>appStore.dispatch(action.call(this, ...n))
    }

}
