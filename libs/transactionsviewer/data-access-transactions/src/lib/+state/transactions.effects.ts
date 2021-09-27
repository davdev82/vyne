import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
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
      concatLatestFrom(() => [this.store$.select(getTransactionsRemoteState)]),
      filter(
        ([, remoteState]) =>
          !!(
            isRemoteDataNotFetched(remoteState) ||
            isRemoteDataError(remoteState)
          )
      ),
      mapTo(TransactionsActions.loadTransactions())
    );
  });

  loadServiceRequests$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionsActions.loadTransactions),
      concatLatestFrom(() => [
        this.store$.select(getDateFilter),
        this.store$.select(getStatusFilter),
        this.store$.select(getPageNumber),
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
    private store$: Store<TransactionsPartialState>,
    private transactionsService: TransactionsApiService
  ) {}
}
