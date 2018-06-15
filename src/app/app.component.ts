import { CounterActions } from './counter-actions';
import { Component, OnDestroy } from '@angular/core';
import { AppStore } from '../index';

@Component({
  selector: 'app-root',
  template: `
  <span class='label label-primary' style='font-size:20px'>{{counter}}</span>
  <hr/>
  <a class='btn btn-default' (click)='dec()'>Decrement</a>
  <a class='btn btn-default' (click)='inc()'>Increment</a>
  <br/><br/>
  <a class='btn btn-default' (click)='decBy(2)'>Decrement 2</a>
  <a class='btn btn-default' (click)='incBy(2)'>Increment 2</a>
  <hr/>
  `
})
export class AppComponent implements OnDestroy {
  title = 'app';

  public counter;
  public inc;
  public dec;
  public incBy;
  public decBy;

  private unsubscribeFromStore: () => void;

  constructor(appStore: AppStore, counterActions: CounterActions) {

    this.inc = counterActions.createDispatcher(counterActions.increment);
    this.dec = counterActions.createDispatcher(counterActions.decrement);
    this.incBy = counterActions.createDispatcher(counterActions.incrementBy);
    this.decBy = counterActions.createDispatcher(counterActions.decrementBy);
    this.counter = appStore.getState().counter;

    this.unsubscribeFromStore = appStore.subscribe(state => this.counter = state.counter);
  }

  public ngOnDestroy() { this.unsubscribeFromStore(); }
}
