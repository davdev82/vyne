import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  isRemoteDataError,
  isRemoteDataLoading,
  isRemoteDataNotFetched,
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

export const getPageCount = createSelector(
  selectTransactionsState,
  (state: TransactionsState) => state.numberOfPages
);

export const isTransactionsNotFetched = createSelector(
  getTransactionsRemoteState,
  (remoteState: RemoteData) => {
    return isRemoteDataNotFetched(remoteState);
  }
);

export const isTransactionsLoading = createSelector(
  getTransactionsRemoteState,
  (remoteState: RemoteData) => {
    return isRemoteDataLoading(remoteState);
  }
);

export const isTransactionsSuccess = createSelector(
  getTransactionsRemoteState,
  (remoteState: RemoteData) => {
    return isRemoteDataOK(remoteState);
  }
);

export const isTransactionsEmpty = createSelector(
  getTransactions,
  (transactions: Transaction[] | null) => {
    return transactions !== null && transactions.length === 0;
  }
);

export const getTransactionsError = createSelector(
  getTransactionsRemoteState,
  (remoteState: RemoteData) => {
    if (isRemoteDataError(remoteState)) {
      return remoteState.error;
    }
    return undefined;
  }
);
