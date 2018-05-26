import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from '../app/app.component';
import { AppStore } from '../index';
import { createStore } from 'redux';
import { Observable } from 'rxjs';
import { Actions } from '../actions';


class SomeActions extends Actions {
    public someAction1(data) { return { type: '1', data }; }
    public someAction2(data) { return { type: '2', data }; }
}
class SomeMoreActions extends Actions {
    constructor(appStore: AppStore) { super(appStore); }
    public someAction(data) { return { type: 'a', data }; }
}
const createAppStoreMock = () => {
    const appStoreMock: AppStore = new AppStore(createStore(state => state));
    spyOn(appStoreMock, 'dispatch');
    return appStoreMock;
};

describe('Actions', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ]
        }).compileComponents();
    }));

    it('should create dispatcher function', () => {
        const someActions = new SomeActions(createAppStoreMock());
        const dispatcherFunction = someActions.createDispatcher(someActions.someAction1)('a');
        expect(dispatcherFunction === undefined);
    });

    it('dispatcher function should work', () => {
        const appStoreMock: AppStore = <AppStore>createAppStoreMock();
        const someActions = new SomeActions(appStoreMock);

        const dispatcherFunction = someActions.createDispatcher(
            someActions.someAction1);

        dispatcherFunction('a');
        dispatcherFunction('b');

        const dispatchSpy = appStoreMock.dispatch;
        expect(dispatchSpy).toHaveBeenCalled();
        expect(dispatchSpy).toHaveBeenCalledTimes(2);
        expect(someActions.someAction1('a')).toEqual({ type: '1', data: 'a' });
        expect(someActions.someAction1('b')).toEqual({ type: '1', data: 'b' });

        someActions.createDispatcher(someActions.someAction2)('c');
        expect(someActions.someAction2('c')).toEqual({ type: '2', data: 'c' });


    });

    it('dispatcher function should work with injected app store', () => {

        const appStoreMock: AppStore = <AppStore>createAppStoreMock();
        const someActions = new SomeMoreActions(appStoreMock);
        const dispatcherFunction = someActions.createDispatcher(someActions.someAction);

        dispatcherFunction('yo');

        const dispatchSpy = appStoreMock.dispatch;
        expect(dispatchSpy).toHaveBeenCalled();
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(someActions.someAction('yo')).toEqual({ type: 'a', data: 'yo' });

    });
});
