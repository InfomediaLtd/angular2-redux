import {CounterActions} from "./counter-actions";
import {Component} from 'angular2/core'
import {AppStore} from "../src/index";

@Component({
    selector: 'my-app',
    template: `
        <span class="label label-primary" style="font-size:20px">{{counter}}</span>
        <hr/>
        <a class="btn btn-default" (click)="dec()">Decrement</a>
        <a class="btn btn-default" (click)="inc()">Increment</a>
        <br/><br/>
        <a class="btn btn-default" (click)="decBy(2)">Decrement 2</a>
        <a class="btn btn-default" (click)="incBy(2)">Increment 2</a>
        <hr/>
    `
})
export class AppComponent {

    private counter;
    private inc;
    private dec;
    private incBy;
    private decBy;

    constructor(appStore:AppStore, counterActions:CounterActions) {

      this.inc = counterActions.createDispatcher(counterActions.increment);
      this.dec = counterActions.createDispatcher(counterActions.decrement);
      this.incBy = counterActions.createDispatcher(counterActions.incrementBy);
      this.decBy = counterActions.createDispatcher(counterActions.decrementBy);
      this.counter = appStore.getState().counter;

      appStore.subscribe(state => this.counter = state.counter);
    }
}
