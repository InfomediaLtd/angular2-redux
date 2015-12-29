/**
 * Wrapper for app store
 */
export declare class AppStore {
    /**
     * Get current state
     */
    getState: () => any;
    /**
     * subscribe to a callback with the state
     */
    subscribe: (subscribeFunction: (state) => void) => () => void;
    /**
     * Dispatch an action
     */
    dispatch: (action) => void;
    /**
     * Create a dispatcher as a curried function using the passed in action creator and an optional context
     */
    createDispatcher: (actionCreator, context) => (...n: any[]) => void;
    constructor(store: any);
}
