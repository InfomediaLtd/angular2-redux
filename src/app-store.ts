/**
 * Wrapper for app store
 */
export class AppStore {

    constructor(private _store:any) {
    }

    getState() {
        return this._store.getState();
    }
    subscribe(subscription) {
        // decorate the subscription with the state passed in as a parameter
        return this._store.subscribe(() => subscription(this.getState()));
    }
    dispatch(action) {
        return this._store.dispatch(action);
    }

}
