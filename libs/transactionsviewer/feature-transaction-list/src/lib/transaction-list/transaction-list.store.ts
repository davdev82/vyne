import { Injectable } from '@angular/core';
import {
  Transaction,
  TransactionStatus,
} from '@transactionsviewer/util-models';
import { ComponentStore } from '@ngrx/component-store';
import { TransactionsFacade } from '@transactionsviewer/data-access-transactions';
import { tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

export interface TransactionListViewModel {
  transactions: Transaction[] | null;
  transactionCount: number | null;
  loading: boolean;
  empty: boolean;
  failure: boolean;
  success: boolean;
  page: number;
}

@Injectable()
export class TransactionListStore extends ComponentStore<never> {
  // ****** Signals (Trigger a state change or a side effect, but do not end in the state)
  statusFilterSubject = new Subject<TransactionStatus>();
  dateFilterSubject = new Subject<string>();
  paginateSubject = new Subject<number>();

  // *************** vm$ ************** (Contains all the data needed by the UI) //
  readonly vm$: Observable<TransactionListViewModel> = this.select(
    this.facade.transactions$,
    this.facade.transactionsCount$,
    this.facade.page$,
    this.facade.isTransactionsLoading$,
    this.facade.isTransactionsFailure$,
    this.facade.isTransactionsEmpty$,
    this.facade.isTransactionsSuccess$,
    (
      transactions,
      transactionCount,
      page,
      loading,
      failure,
      empty,
      success
    ) => ({
      transactions,
      transactionCount,
      page,
      loading,
      failure,
      empty,
      success,
    })
  );

  private readonly pageEnterSideEffect = this.effect(
    (trigger$: Observable<void>) => {
      return trigger$.pipe(
        tap(() => {
          this.facade.enter();
        })
      );
    }
  )();

  private readonly filterByStatusSideEffect = this.effect(
    (trigger$: Observable<TransactionStatus>) => {
      return trigger$.pipe(
        tap((status) => {
          this.facade.filterByStatus(status);
        })
      );
    }
  )(this.statusFilterSubject);

  private readonly filterByDateSideEffect = this.effect(
    (trigger$: Observable<string>) => {
      return trigger$.pipe(
        tap((date) => {
          this.facade.filterByDate(date);
        })
      );
    }
  )(this.dateFilterSubject);

  private readonly paginateSideEffect = this.effect(
    (trigger$: Observable<number>) => {
      return trigger$.pipe(
        tap((page) => {
          this.facade.paginate(page);
        })
      );
    }
  )(this.paginateSubject);

  constructor(private facade: TransactionsFacade) {
    super();
  }

  filterByStatus(status: TransactionStatus) {
    this.statusFilterSubject.next(status);
  }

  filterByDate(date: string) {
    this.dateFilterSubject.next(date);
  }

  paginate(page: PageEvent) {
    this.paginateSubject.next(page.pageIndex);
  }
}
