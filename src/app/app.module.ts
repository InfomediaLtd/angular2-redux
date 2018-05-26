import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppStore, createAppStoreFactoryWithOptions } from '../index';

import counterReducer from './counter-reducer';
import { CounterActions } from './counter-actions';
import { Actions } from '../actions';

const logger = store => next => action => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

const appStoreFactory = createAppStoreFactoryWithOptions({
  reducers: counterReducer,
  debug: true
});

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  providers: [CounterActions, Actions, { provide: AppStore, useFactory: appStoreFactory }],
  bootstrap: [AppComponent]
})

export class AppModule {}
