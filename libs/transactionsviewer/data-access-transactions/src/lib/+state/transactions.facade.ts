import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as TransactionsActions from './transactions.actions';
import * as TransactionsFeature from './transactions.reducer';
import * as TransactionsSelectors from './transactions.selectors';

@Injectable()
export class TransactionsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(TransactionsSelectors.getTransactionsLoaded)
  );
  allTransactions$ = this.store.pipe(
    select(TransactionsSelectors.getAllTransactions)
  );
  selectedTransactions$ = this.store.pipe(
    select(TransactionsSelectors.getSelected)
  );

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(TransactionsActions.init());
  }
}
