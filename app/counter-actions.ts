import {Injectable} from "angular2/core";
import {Actions} from "../src/index";

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

@Injectable()
export class CounterActions extends Actions {
    increment() { return {type: INCREMENT} };
    decrement() { return {type: DECREMENT} };
    incrementBy(n) {
      return dispatch => {
        for (var i=0; i<n; i++) dispatch(this.increment());
      }
    }
    decrementBy(n) {
      return dispatch => {
        for (var i=0; i<n; i++) dispatch(this.decrement());
      }
    };
}
