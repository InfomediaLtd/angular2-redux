import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from '../app/app.component';
import { AppStore } from '../index';
import { createStore } from 'redux';
import { Observable } from 'rxjs';
import { Actions } from '../actions';
import { map, distinctUntilChanged } from 'rxjs/operators';

const createSimpleAppStore = () => {
    return new AppStore(createStore((state: number = 0, action): number => {
        if (action.type === 'inc') {
            return state + 1;
        } else {
            return state;
        }
    }));
};

describe('Dispatching Actions', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ]
        }).compileComponents();
    }));

    it('subscription is called when dispatching actions', () => {

        const appStore: AppStore = <AppStore>createSimpleAppStore();

        let testCounter = 0;
        appStore.subscribe(state => testCounter = state);

        appStore.dispatch({ type: 'inc' });
        expect(testCounter === 1);

    });

    it('createDispatcher works as expected', () => {

        const appStore: AppStore = <AppStore>createSimpleAppStore();

        let testCounter = 0;
        appStore.subscribe(state => testCounter = state);

        const dispatcher = appStore.createDispatcher(() => ({ type: 'inc' }), null);
        dispatcher();
        dispatcher();
        expect(testCounter === 2);

    });

});

describe('Observable', () => {

    it('returned by select()', () => {
        const appStore = createSimpleAppStore();
        const state$ = appStore.select(state => state);
        expect(state$ === undefined);
    });

    it('contains initial state', () => {
        const appStore = createSimpleAppStore();
        let currentState;

        appStore.select(state => state)
            .subscribe(state => currentState = state);

        expect(currentState === 0);
    });

    it('updates on dispatch', () => {
        const appStore = createSimpleAppStore();
        let currentState;

        appStore.select(state => state)
            .subscribe(state => currentState = state);

        appStore.dispatch({ type: 'inc' });

        expect(currentState === 1);
    });

    it('maps with given selector function', () => {
        const appStore = createSimpleAppStore();
        const selector = jasmine.createSpy().and.callFake(state => state * state);
        let currentState;

        appStore.select(selector)
            .subscribe(state => currentState = state);

        appStore.dispatch({ type: 'inc' });
        expect(currentState === 1);

        appStore.dispatch({ type: 'inc' });
        expect(currentState === 4);

        expect(selector.calls.count() === 3);
    });

    it('maps with given key string', () => {
        interface NestedState { foo: number; }
        const appStore = new AppStore(createStore((state: NestedState = { foo: 0 }, action) => {
            if (action.type === 'inc') {
                return { foo: state.foo + 1 };
            } else {
                return state;
            }
        }));
        let currentState;

        appStore.select('foo')
            .subscribe(state => currentState = state);

        appStore.dispatch({ type: 'inc' });
        expect(currentState === 1);

        appStore.dispatch({ type: 'inc' });
        expect(currentState === 2);
    });

    it('did not emit when selector returns equal values', () => {
        const appStore = createSimpleAppStore();
        const sameInstance = {};
        const selector = jasmine.createSpy().and.returnValue(sameInstance);
        let currentState;
        const listener = jasmine.createSpy().and.callFake(state => currentState = state);

        appStore.select(selector)
            .subscribe(listener);

        appStore.dispatch({ type: 'inc' });
        appStore.dispatch({ type: 'inc' });
        expect(currentState === sameInstance);

        expect(selector.calls.count() === 3);
        expect(listener.calls.count() === 1);
    });
});

