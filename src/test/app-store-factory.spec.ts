import { TestBed, async } from '@angular/core/testing';
import { AppStore } from '../index';
import { createStore } from 'redux';
import { Observable } from 'rxjs';
import { Actions } from '../actions';
import { AppComponent } from '../app/app.component';
import { createAppStoreFactory, createAppStoreFactoryWithOptions, applyDevTools } from '../app-store-factory';

const reducer = (state = 0, action) => {
    if (action.type === 'inc') {
        return state + 1;
    } else {
        return state;
    }
};

describe('applyDevTools', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ]
        }).compileComponents();
    }));

    it('applies debug options properly', () => {

        const wrapper = {
            devToolsMiddleware: () => { }
        };
        spyOn(wrapper, 'devToolsMiddleware');
        const devToolsMiddlewareSpy = wrapper.devToolsMiddleware;

        window['devToolsExtension'] = () => wrapper.devToolsMiddleware;

        // specifying debug option
        applyDevTools(true)();
        expect(devToolsMiddlewareSpy).toHaveBeenCalledTimes(1);
        // expect(devToolsMiddlewareSpy.calls.count() === 1);
        applyDevTools(false)();
        expect(devToolsMiddlewareSpy).toHaveBeenCalledTimes(1);

        // using function to specify debug option
        applyDevTools(() => true)();
        expect(devToolsMiddlewareSpy).toHaveBeenCalledTimes(2);
        applyDevTools(() => false)();
        expect(devToolsMiddlewareSpy).toHaveBeenCalledTimes(2);

        // not specifying
        applyDevTools(true)();
        expect(devToolsMiddlewareSpy).toHaveBeenCalledTimes(3);
        applyDevTools(undefined)();
        expect(devToolsMiddlewareSpy).toHaveBeenCalledTimes(3);
        applyDevTools(null)();
        expect(devToolsMiddlewareSpy).toHaveBeenCalledTimes(3);

    });
});

describe('createAppStoreFactoryWithOptions', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ]
        }).compileComponents();
    }));

    it('returns a function that creates an AppStore', () => {
        const f = createAppStoreFactory(reducer);
        const appStore = f();
        expect(typeof appStore === 'object');
        appStore.dispatch({ type: 'inc' });
        expect(appStore.getState() === 1);
    });

    it('Supports multiple reducers', () => {
        const f = createAppStoreFactoryWithOptions({ reducers: { a: reducer, b: reducer } });
        const appStore = f();
        appStore.dispatch({ type: 'inc' });
        expect(appStore.getState() === { a: 1, b: 1 });
    });

    it('Supports thunks', () => {
        const f = createAppStoreFactoryWithOptions({ reducers: reducer });
        const appStore = f();
        appStore.dispatch((dispatch) => {
            dispatch({ type: 'inc' });
            dispatch({ type: 'inc' });
        });
        expect(appStore.getState() === 2);
    });

    it('Supports additional middleware', () => {

        let counterInsideLogger = 0;
        const logger = store => next => action => {
            counterInsideLogger++;
            return next(action);
        };

        const f = createAppStoreFactoryWithOptions({
            reducers: reducer
        });
        const appStore = f();
        appStore.dispatch((dispatch) => {
            dispatch({ type: 'inc' });
            dispatch({ type: 'inc' });
        });
        expect(appStore.getState() === 2);
        expect(counterInsideLogger === 2);
    });

});
