import * as CounterActions from './counter-actions';

export default (state = { counter: 0 }, action: any = {}) => {
    switch (action.type) {
        case CounterActions.INCREMENT:
            return Object.assign({}, state, { counter: state.counter + 1 });
        case CounterActions.DECREMENT:
            return Object.assign({}, state, { counter: state.counter - 1 });
        default:
            return state;
    }
};
