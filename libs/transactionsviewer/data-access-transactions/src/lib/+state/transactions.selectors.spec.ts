import {
  remoteDataError,
  remoteDataLoading,
  remoteDataOK,
  RemoteDataState,
} from '@transactionsviewer/util-models';
import {
  TransactionsPartialState,
  TransactionsState,
  TRANSACTIONS_FEATURE_KEY,
} from './transactions.reducer';
import { MOCK_RESPONSE } from '../mock-data';
import {
  getDateFilter,
  getPageNumber,
  getStatusFilter,
  getTransactions,
  getTransactionsCount,
  getTransactionsRemoteState,
  isTransactionsEmpty,
  isTransactionsFailure,
  isTransactionsLoading,
  isTransactionsSuccess,
} from './transactions.selectors';

describe('Transaction Selectors', () => {
  const error = new Error('error occurred');
  const dateFilter = 'dateFilter';
  const statusFilter = 'COMPLETED';
  const pageNumber = 4;

  const state = {
    [TRANSACTIONS_FEATURE_KEY]: {
      dateFilter: dateFilter,
      page: pageNumber,
      remoteState: remoteDataOK(null),
      statusFilter: statusFilter,
      totalNumberOfItems: 25,
      transactions: MOCK_RESPONSE.items,
    } as TransactionsState,
  } as TransactionsPartialState;

  it('getTransactionsRemoteState return the remote state information of the transactions call', () => {
    const data = getTransactionsRemoteState(state);
    expect(data.kind).toEqual(RemoteDataState.OK);
  });

  it('getDateFilter return the date filter from the state', () => {
    const data = getDateFilter(state);
    expect(data).toEqual(dateFilter);
  });

  it('getStatusFilter return the status filter from the state', () => {
    const data = getStatusFilter(state);
    expect(data).toEqual(statusFilter);
  });

  it('getTransactions return the transactions from the state', () => {
    const data = getTransactions(state);
    expect(data).toEqual(MOCK_RESPONSE.items);
  });

  it('getPageNumber return the page from the state', () => {
    const data = getPageNumber(state);
    expect(data).toEqual(pageNumber);
  });

  it('getTransactionsCount return the transactions count from the state', () => {
    const data = getTransactionsCount(state);
    expect(data).toEqual(25);
  });

  it('isTransactionsLoading return true if remoteState is loading', () => {
    const data = isTransactionsLoading({
      ...state,
      [TRANSACTIONS_FEATURE_KEY]: {
        ...state[TRANSACTIONS_FEATURE_KEY],
        remoteState: remoteDataLoading(),
      },
    });
    expect(data).toEqual(true);
  });

  it('isTransactionsFailure return true if remoteState is failure', () => {
    const data = isTransactionsFailure({
      ...state,
      [TRANSACTIONS_FEATURE_KEY]: {
        ...state[TRANSACTIONS_FEATURE_KEY],
        remoteState: remoteDataError(error),
      },
    });
    expect(data).toEqual(true);
  });

  it('isTransactionsSuccess return true if remoteState is success', () => {
    const data = isTransactionsSuccess({
      ...state,
      [TRANSACTIONS_FEATURE_KEY]: {
        ...state[TRANSACTIONS_FEATURE_KEY],
        remoteState: remoteDataOK(null),
      },
    });
    expect(data).toEqual(true);
  });

  it('isTransactionsEmpty return true if remoteState is success and transaction is empty', () => {
    const data = isTransactionsEmpty({
      ...state,
      [TRANSACTIONS_FEATURE_KEY]: {
        ...state[TRANSACTIONS_FEATURE_KEY],
        remoteState: remoteDataOK(null),
        transactions: [],
      },
    });
    expect(data).toEqual(true);
  });
});
