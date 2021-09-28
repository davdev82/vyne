import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  isRemoteDataError,
  isRemoteDataLoading,
  isRemoteDataOK,
  RemoteData,
  Transaction,
} from '@transactionsviewer/util-models';
import {
  TransactionsPartialState,
  TransactionsState,
  TRANSACTIONS_FEATURE_KEY,
} from './transactions.reducer';

export const selectTransactionsState = createFeatureSelector<
  TransactionsPartialState,
  TransactionsState
>(TRANSACTIONS_FEATURE_KEY);

export const getTransactionsRemoteState = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.remoteState
);

export const getDateFilter = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.dateFilter
);

export const getStatusFilter = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.statusFilter
);

export const getTransactions = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.transactions
);

export const getPageNumber = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.page
);

export const getTransactionsCount = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.totalNumberOfItems
);

export const isTransactionsLoading = createSelector(
  getTransactionsRemoteState,
  (remoteState: RemoteData) => isRemoteDataLoading(remoteState)
);

export const isTransactionsFailure = createSelector(
  getTransactionsRemoteState,
  (remoteState: RemoteData) => isRemoteDataError(remoteState)
);

export const isTransactionsSuccess = createSelector(
  getTransactionsRemoteState,
  (remoteState: RemoteData) => isRemoteDataOK(remoteState)
);

export const isTransactionsEmpty = createSelector(
  getTransactions,
  (transactions: Transaction[] | null) => {
    return transactions !== null && transactions.length === 0;
  }
);
