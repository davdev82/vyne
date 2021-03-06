import { createReducer, on, Action } from '@ngrx/store';
import {
  RemoteData,
  remoteDataError,
  remoteDataLoading,
  remoteDataNotFetched,
  remoteDataOK,
  Transaction,
  TransactionStatus,
} from '@transactionsviewer/util-models';

import * as TransactionsActions from './transactions.actions';

export const TRANSACTIONS_FEATURE_KEY = 'transactions';

export interface TransactionsState {
  remoteState: RemoteData<null>;
  transactions: Transaction[] | null;
  statusFilter: TransactionStatus | null;
  dateFilter: string | null;
  page: number;
  totalNumberOfItems: number | null;
}

export interface TransactionsPartialState {
  readonly [TRANSACTIONS_FEATURE_KEY]: TransactionsState;
}

export const initialState: TransactionsState = {
  remoteState: remoteDataNotFetched(),
  transactions: null,
  statusFilter: null,
  page: 0,
  dateFilter: null,
  totalNumberOfItems: null,
};

const transactionsReducer = createReducer(
  initialState,
  on(TransactionsActions.loadTransactions, (state) => ({
    ...state,
    remoteState: remoteDataLoading(),
    transactions: null,
  })),
  on(TransactionsActions.loadTransactionsSuccess, (state, { apiResponse }) => ({
    ...state,
    remoteState: remoteDataOK(null),
    transactions: apiResponse.items,
    totalNumberOfItems: apiResponse.totalNumberOfItems,
  })),
  on(TransactionsActions.loadTransactionsFailure, (state, { error }) => ({
    ...state,
    remoteState: remoteDataError(error),
  })),
  on(TransactionsActions.filterByDate, (state, { date: dateFilter }) => ({
    ...state,
    dateFilter,
    page: 0,
  })),
  on(TransactionsActions.filterByStatus, (state, { status: statusFilter }) => ({
    ...state,
    statusFilter,
    page: 0,
  })),
  on(TransactionsActions.paginate, (state, { page }) => ({
    ...state,
    page,
  }))
);

export function reducer(state: TransactionsState | undefined, action: Action) {
  return transactionsReducer(state, action);
}
