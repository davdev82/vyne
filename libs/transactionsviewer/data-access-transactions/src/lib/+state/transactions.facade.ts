import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TransactionStatus } from '@transactionsviewer/util-models';
import { OperatorFunction, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as TransactionsActions from './transactions.actions';
import * as TransactionsFeature from './transactions.reducer';
import * as TransactionsSelectors from './transactions.selectors';

@Injectable()
export class TransactionsFacade {
  page$ = this.store.pipe(
    select(TransactionsSelectors.getPageNumber),
    this.filterNullOrUndefined()
  );

  transactions$ = this.store.pipe(
    select(TransactionsSelectors.getTransactions),
    this.filterNullOrUndefined()
  );

  dateFilter$ = this.store.pipe(
    select(TransactionsSelectors.getDateFilter),
    this.filterNullOrUndefined()
  );

  statusFilter$ = this.store.pipe(
    select(TransactionsSelectors.getStatusFilter),
    this.filterNullOrUndefined()
  );

  isTransactionsLoading$ = this.store.pipe(
    select(TransactionsSelectors.isTransactionsLoading),
    filter((loading) => !!loading)
  );

  isTransactionsNotFetched$ = this.store.pipe(
    select(TransactionsSelectors.isTransactionsNotFetched),
    filter((notFetched) => !!notFetched)
  );

  isTransactionsSuccess$ = this.store.pipe(
    select(TransactionsSelectors.isTransactionsSuccess),
    filter((success) => !!success)
  );

  isTransactionsEmpty$ = this.store.pipe(
    select(TransactionsSelectors.isTransactionsEmpty),
    filter((isEmpty) => !!isEmpty)
  );

  transactionsError$ = this.store.pipe(
    select(TransactionsSelectors.getTransactionsError),
    this.filterNullOrUndefined()
  );

  transactionsCount$ = this.store.pipe(
    select(TransactionsSelectors.getTransactionsCount),
    this.filterNullOrUndefined()
  );

  pageCount$ = this.store.pipe(
    select(TransactionsSelectors.getPageCount),
    this.filterNullOrUndefined()
  );

  constructor(
    private store: Store<TransactionsFeature.TransactionsPartialState>
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

  private filterNullOrUndefined<T = unknown>(): OperatorFunction<
    T | null | undefined,
    T
  > {
    return pipe(
      filter((data) => data !== null && data !== undefined),
      map((value: T | undefined | null) => value as T)
    );
  }
}
