import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from '../app//app.component';
import { AppStore } from '../index';
import { createStore } from 'redux';
import { Observable } from 'rxjs';


const createSimpleAppStore = () => {
  return new AppStore(createStore((state: number = 0, action): number => {
    if (action.type === 'inc') {
      return state + 1;
    } else {
      return state;
    }
  }));
};


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ]
    }).compileComponents();
  }));

  it('should do math', () => {
    expect(1 + 1 === 2);
    expect(5 >= 4);
  });

  xit('should skip this', () => {
    expect(4 === 4);
  });
});
