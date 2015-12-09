/**
 * Wrapper for app store
 */
export class AppStore {

    public getState  :()=>any;
    public subscribe :(subscribeFunction:(state)=>void)=>()=>void;
    public dispatch  :(action)=>void;

    constructor(store:any) {
        this.getState = () => {
            return store.getState();
        };
        this.subscribe = (subscribeFunction:(state)=>any) => {
            // decorate the subscription with the state passed in as a parameter
            return store.subscribe(() => subscribeFunction(store.getState()));
        };
        this.dispatch = (action) => {
            return store.dispatch(action);
        };
    }


}
