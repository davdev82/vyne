import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  isRemoteDataError,
  isRemoteDataNotFetched,
} from '@transactionsviewer/util-models';
import { of } from 'rxjs';
import { catchError, filter, map, mapTo, switchMap } from 'rxjs/operators';
import { TransactionsApiService } from '../transactions-api.service';
import * as TransactionsActions from './transactions.actions';
import { TransactionsPartialState } from './transactions.reducer';
import {
  getDateFilter,
  getPageNumber,
  getStatusFilter,
  getTransactionsRemoteState,
} from './transactions.selectors';

@Injectable()
export class TransactionsEffects {
  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionsActions.enterTransactionsPage),
      concatLatestFrom(() => [
        this.store$.pipe(select(getTransactionsRemoteState)),
      ]),
      filter(([, remoteState]) => {
        return !!(
          isRemoteDataNotFetched(remoteState) || isRemoteDataError(remoteState)
        );
      }),
      mapTo(TransactionsActions.loadTransactions())
    );
  });

  loadTransactions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionsActions.loadTransactions),
      concatLatestFrom(() => [
        this.store$.pipe(select(getDateFilter)),
        this.store$.pipe(select(getStatusFilter)),
        this.store$.pipe(select(getPageNumber)),
      ]),
      switchMap(([, dateFilter, statusFilter, page]) => {
        return this.transactionsService
          .getTransactions(dateFilter, statusFilter, page)
          .pipe(
            map((apiResponse) => {
              return TransactionsActions.loadTransactionsSuccess({
                apiResponse,
              });
            }),
            catchError((error: HttpErrorResponse) => {
              return of(TransactionsActions.loadTransactionsFailure({ error }));
            })
          );
      })
    );
  });

  filterTransactions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        TransactionsActions.paginate,
        TransactionsActions.filterByDate,
        TransactionsActions.filterByStatus
      ),
      mapTo(TransactionsActions.loadTransactions())
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly store$: Store<TransactionsPartialState>,
    private readonly transactionsService: TransactionsApiService
  ) {}
}
