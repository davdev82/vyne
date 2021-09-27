import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as TransactionsActions from './transactions.actions';
import { TransactionsEffects } from './transactions.effects';

describe('TransactionsEffects', () => {
  let actions: Observable<Action>;
  let effects: TransactionsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        TransactionsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(TransactionsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: TransactionsActions.init() });

      const expected = hot('-a-|', {
        a: TransactionsActions.loadTransactionsSuccess({ transactions: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
