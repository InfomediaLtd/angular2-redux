import { Injectable } from '@angular/core';
import { AppStore, Actions } from '../index';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

@Injectable()
export class CounterActions extends Actions {

  constructor(appStore: AppStore) { super(appStore); }

  public increment() { return { type: INCREMENT }; }
  public decrement() { return { type: DECREMENT }; }
  public incrementBy(n) {
    return dispatch => {
      for (let i = 0; i < n; i++) {
        dispatch(this.increment());
      }
    };
  }

  public decrementBy(n) {
    return dispatch => {
      for (let i = 0; i < n; i++) {
        dispatch(this.decrement());
      }
    };
  }
}
