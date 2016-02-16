# Angular2 Redux

[![travis build](https://img.shields.io/travis/InfomediaLtd/angular2-redux.svg?style=flat-square)](https://travis-ci.org/InfomediaLtd/angular2-redux)
[![version](https://img.shields.io/npm/v/angular2-redux.svg?style=flat-square)](https://www.npmjs.com/package/angular2-redux)
[![downloads](https://img.shields.io/npm/dm/angular2-redux.svg?style=flat-square)](https://www.npmjs.com/package/angular2-redux)
[![MIT Licence](https://img.shields.io/npm/l/angular2-redux.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![PRs Welcome](https://img.shields.io/badge/prs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Wrapper components for using Redux in an Angular2 application.

A full Angular 2 Redux demo can be found here: [https://github.com/InfomediaLtd/angular2-redux-example](https://github.com/InfomediaLtd/angular2-redux-example)

### AppStore

This library includes a wrapper for the redux store. Create the wrapper AppStore by passing in the Redux appStore:
```js
new AppStore(reduxAppStore);
```

All redux's [store methods](http://redux.js.org/docs/basics/Store.html) are supported, with the additional benefit of getting the state passed into subscribers:
```js
appStore.subscribe(state => {
  // do something with state
});
```

### Bootstrapping

It is recommended to create the app store in a factory, for supporting redux (and the redux dev tools) inside Angular2's zone. That means the app store will only be created once angular is bootstrapped:
```js
import {AppStore} from "angular2-redux";
import {bootstrap} from "angular2/platform/browser";
//...
const appStoreFactory = () => {
    let reduxAppStore;
    // create redux app store with reducers and middleware  
    // ...
    return new AppStore(reduxAppStore);
};
import {AppStore} from "angular2-redux";
import {bootstrap} from "angular2/platform/browser";
//...
bootstrap(MyAppComponent,[provide(AppStore, { useFactory: appStoreFactory })]);
```

Another option is to use the provided factory, by passing in your reducers (one or more) and optional middleware. This factory supports the redux dev tools and the thunk middleware out of the box.

Simple creation with a single reducer:
```js
import {AppStore,createAppStoreFactory} from "angular2-redux";
//...
const appStoreFactory = createAppStoreFactory(counterReducer);
```

Creation with multiple reducers and additional middleware
```js
import {AppStore,createAppStoreFactory} from "angular2-redux";
//...
const loggerMiddleware = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
const appStoreFactory = createAppStoreFactory({redoucer1,reducer2},[loggerMiddleware]);
```

### Action Creators

The Actions superclass for action creators lets you bind the app store dispatch method to any action. You can use this helper function to avoid having a local property for the app store and the actions inside your Angular components.

Assuming MyActions class extends Actions you can use it like this:
```js
@Component({
    selector: 'my-component',
    template: '<button (click)="someAction()">Decrement</a>'
})
export class MyComponent {
  private someAction;
  constructor(appStore:AppStore, myActions:MyActions) {
    this.someAction = counterActions.createDispatcher(appStore, myActions.someAction);
  }
}
```

### Usage example

A usage example is included in this project here: [https://github.com/InfomediaLtd/angular2-redux/tree/master/app](https://github.com/InfomediaLtd/angular2-redux/tree/master/app)

To run the included example you need [jspm](http://jspm.io/) and [live-server](https://www.npmjs.com/package/live-server):
```sh
jspm install
live-server
```

### Maintainers

When updating code please follow these commands for checking in
```
git add *
npm run commit
git push origin master
```
