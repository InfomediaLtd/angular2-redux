import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AppComponent} from "./app.component";
import {AppStore,createAppStoreFactoryWithOptions} from "../src/index";

import counterReducer from "./counter-reducer"
import {CounterActions} from "./counter-actions";

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
const appStoreFactory = createAppStoreFactoryWithOptions({
                          reducers:counterReducer,
                          additionalMiddlewares:[logger],
                          debug:true
                        });
@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  providers: [CounterActions, { provide: AppStore, useFactory: appStoreFactory }],
  bootstrap: [AppComponent]
})
export class AppModule {
    
}