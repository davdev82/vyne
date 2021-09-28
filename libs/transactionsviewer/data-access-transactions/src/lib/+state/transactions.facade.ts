import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TransactionStatus } from '@transactionsviewer/util-models';
import * as TransactionsActions from './transactions.actions';
import * as TransactionsFeature from './transactions.reducer';
import * as TransactionsSelectors from './transactions.selectors';

@Injectable()
export class TransactionsFacade {
  page$ = this.store.pipe(select(TransactionsSelectors.getPageNumber));

  transactions$ = this.store.pipe(
    select(TransactionsSelectors.getTransactions)
  );

  isTransactionsLoading$ = this.store.pipe(
    select(TransactionsSelectors.isTransactionsLoading)
  );

  isTransactionsSuccess$ = this.store.pipe(
    select(TransactionsSelectors.isTransactionsSuccess)
  );

  isTransactionsFailure$ = this.store.pipe(
    select(TransactionsSelectors.isTransactionsFailure)
  );

  isTransactionsEmpty$ = this.store.pipe(
    select(TransactionsSelectors.isTransactionsEmpty)
  );

  transactionsCount$ = this.store.pipe(
    select(TransactionsSelectors.getTransactionsCount)
  );

  constructor(
    private readonly store: Store<TransactionsFeature.TransactionsPartialState>
  ) {}

  enter() {
    this.store.dispatch(TransactionsActions.enterTransactionsPage());
  }

  paginate(page: number) {
    this.store.dispatch(
      TransactionsActions.paginate({
        page,
      })
    );
  }

  filterByStatus(status: TransactionStatus) {
    this.store.dispatch(
      TransactionsActions.filterByStatus({
        status,
      })
    );
  }

  filterByDate(date: string) {
    this.store.dispatch(
      TransactionsActions.filterByDate({
        date,
      })
    );
  }
}
