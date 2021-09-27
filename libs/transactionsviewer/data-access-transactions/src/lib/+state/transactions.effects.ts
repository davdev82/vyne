import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as TransactionsActions from './transactions.actions';
import * as TransactionsFeature from './transactions.reducer';

@Injectable()
export class TransactionsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return TransactionsActions.loadTransactionsSuccess({
            transactions: [],
          });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return TransactionsActions.loadTransactionsFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
