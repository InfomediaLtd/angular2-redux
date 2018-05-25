import { Observable, of } from 'rxjs';

// ensure required operators are enabled
import { map, distinctUntilChanged } from 'rxjs/operators';

/**
 * Wrapper for app store,
 */
export class AppStore {

    /**
     * Get current state
     */
    public getState: () => any;
    /**
     * subscribe to a callback with the state
     */
    public subscribe: (subscriber: (state) => void) => () => void;
    /**
     * Dispatch an action
     */
    public dispatch: (action) => void;
    /**
     * Create a dispatcher as a curried function using the passed in action creator and an optional context
     */
    public createDispatcher: (actionCreator, context) => (...n: any[]) => void;

    public store$: Observable<any> = null;

    constructor(store: any) {
        this.store$ =  of(store);
        this.getState = () => {
            return store.getState();
        };
        this.subscribe = (subscriber: (state) => void) => {
            // decorate the subscriber with the state passed in as a parameter
            return store.subscribe(
                () => {
                    subscriber(store.getState());
                }
            );
        };
        this.dispatch = (action) => {
            return store.dispatch(action);
        };
        this.createDispatcher = (actionCreator, context): (...n: any[]) => void => {
            return (...args) => store.dispatch(actionCreator.call(context, ...args));
        };
    }

    public select<R>(keyOrSelector: ((state: any) => R) | string | number | symbol): Observable<R> {
        if (typeof keyOrSelector === 'string' || typeof keyOrSelector === 'number'
            || typeof keyOrSelector === 'symbol') {
            return this.store$
            .pipe (
                map(state => state[<string|number|symbol> keyOrSelector]),
                distinctUntilChanged()
            );
        } else if (typeof keyOrSelector === 'function') {
            return this.store$.pipe(
                map(keyOrSelector),
                distinctUntilChanged()
            );
        } else {
            throw new TypeError(`Unknown Parameter Type: `
                + `Expected type of function or valid key type, got ${typeof keyOrSelector}`);
        }
    }
}
