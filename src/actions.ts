import {AppStore} from "./app-store"

/**
 * abstract class to provide utility methods for action creators
 */
export class Actions {

    createDispatcher(appStore:AppStore, action:(...n:any[])=>any):()=>void {
        return (...n)=>appStore.dispatch(action.call(this, ...n))
    }

}

