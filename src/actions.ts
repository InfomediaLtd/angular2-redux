import { AppStore } from './app-store';
import { Injectable } from '@angular/core';

/**
 * Abstract class to provide utility methods for action creators
 */
@Injectable()
export class Actions {
    public appStore;
    constructor(private _appStore: AppStore) {
        this.appStore = _appStore;
    }

    public createDispatcher(action: (...n: any[]) => any): (...n) => void {
        return (...n) => this.appStore.dispatch(action.call(this, ...n));
    }

}
