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

All redux's [store methods](http://redux.js.org/docs/basics/Store.html) are supported, with the additional benefit of getting the state passed into subscribers. Here is an example of a sample component using dependency injection to get the store, subscribe to it and clean up the subscription when it is destroyed:
```js
export class SomeComponent implements OnDestroy {
  private unsubscribe:()=>void;
  constructor(appStore:AppStore) {
    this.unsubscribe = appStore.subscribe(state => {
      // do something with state
    });
  }
  public ngOnDestroy() {
    // unsubscribe when the component is destroyed
    this.unsubscribe();
  }
}
```

### Bootstrapping

It is recommended to create the app store in a factory, for supporting redux (and the redux dev tools) inside Angular2's zone. That means the app store will only be created after angular is bootstrapped:
```js
import {AppStore} from "angular2-redux";
import {bootstrap} from "angular2/platform/browser";
// create factory to be called once angular has been bootstrapped
const appStoreFactory = () => {
    let reduxAppStore;
    // create redux store
    // ...
    return new AppStore(reduxStore);
};
// bootstrap angular
bootstrap(MyAppComponent,[provide(AppStore, { useFactory: appStoreFactory })]);
```

Another option is to use the provided factory, by passing in your reducers (one or more) and optional middlewares. This factory supports the [thunk middleware](https://github.com/gaearon/redux-thunk) and the [redux dev tools Chrome extension](https://github.com/zalmoxisus/redux-devtools-extension) out of the box. To turn on the dev tools pass the debug param in the URL query string (http://...?debug=true)

Simple creation with a single reducer:
```js
import {AppStore,createAppStoreFactory} from "angular2-redux";
//...
// create app store factory
const appStoreFactory = createAppStoreFactory(counterReducer);
bootstrap(MyAppComponent,[provide(AppStore, { useFactory: appStoreFactory })]);
```

Creation with more options: multiple reducers, additional middleware, debugging
```js
import {AppStore,createAppStoreFactoryWithOptions} from "angular2-redux";
//...
// my logger middleware
const loggerMiddleware = store => next => action => {
  console.log('dispatching', action);
  return next(action);
}
// create app store factory
const appStoreFactory = createAppStoreFactoryWithOptions({
                          reducers:{reducer1,reducer2},
                          additionalMiddlewares:[loggerMiddleware],
                          debug:true // accepts a function as well
                        });
bootstrap(MyAppComponent,[provide(AppStore, { useFactory: appStoreFactory })]);
```

### Action Creators

The Actions is intended to be subclassed by action creators. It lets you bind the app store dispatch method to any action. You can use this helper function to avoid having a local property for the app store and the actions inside your Angular components.

Assuming MyActions class extends Actions you can use it like this:
```js
@Component({
    selector: 'my-component',
    template: '<button (click)="someAction()">Decrement</a>'
})
export class MyComponent {
  private someAction;
  constructor(myActions:MyActions) {
    this.someAction = myActions.createDispatcher(myActions.someAction);
  }
}
```

If you want your actions pure or decoupled from the app store (in case you're using multiple app stores), you can pass the app store in the createDispatcher function:
```js
constructor(myActions:MyActions, appStore:AppStore) {
  this.someAction = myActions.createDispatcher(myActions.someAction, appStore);
}
```

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
