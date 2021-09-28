import { Store } from '@ngrx/store';
import { getMockStore, MockStore } from '@ngrx/store/testing';
import {
  remoteDataError,
  remoteDataNotFetched,
  TransactionsApiResponse,
} from '@transactionsviewer/util-models';
import { cold, hot } from 'jest-marbles';
import { Observable } from 'rxjs';
import { TransactionsEffects } from './transactions.effects';
import * as TransactionsActions from './transactions.actions';
import {
  getDateFilter,
  getPageNumber,
  getStatusFilter,
  getTransactionsRemoteState,
} from './transactions.selectors';
import { Actions } from '@ngrx/effects';
import { TransactionsPartialState } from './transactions.reducer';

describe('TransactionsEffects', () => {
  let effects: TransactionsEffects;
  let store: MockStore;

  const mockGetTransactions: jest.Mock<Observable<TransactionsApiResponse>> =
    jest.fn();

  const mockTransactionsApiService = {
    getTransactions: mockGetTransactions,
  };

  const dateFilter = 'dateFilter';
  const statusFilter = 'COMPLETED';
  const pageNumber = 4;
  const error = new Error();

  const mockApiResponse: TransactionsApiResponse = {
    items: [],
    totalNumberOfItems: 25,
  } as unknown as TransactionsApiResponse;

  beforeEach(() => {
    store = getMockStore();
    mockGetTransactions.mockClear();
  });

  describe('init$', () => {
    beforeEach(() => {
      effects = new TransactionsEffects(
        new Actions(
          hot('-----a', {
            a: TransactionsActions.enterTransactionsPage(),
          })
        ),
        store as Store<TransactionsPartialState>,
        mockTransactionsApiService as never
      );
    });

    it('should emit a loadTransactions action when the transactions have not been fetched', () => {
      const expected$ = cold('-----a', {
        a: TransactionsActions.loadTransactions(),
      });
      store.overrideSelector(
        getTransactionsRemoteState,
        remoteDataNotFetched()
      );

      expect(effects.init$).toBeObservable(expected$);
    });

    it('should emit a loadTransactions action when the transactions have been errored', () => {
      const expected$ = cold('-----a', {
        a: TransactionsActions.loadTransactions(),
      });
      store.overrideSelector(
        getTransactionsRemoteState,
        remoteDataError(new Error())
      );

      expect(effects.init$).toBeObservable(expected$);
    });
  });

  describe('loadTransactions$', () => {
    beforeEach(() => {
      effects = new TransactionsEffects(
        new Actions(
          hot('-----a', {
            a: TransactionsActions.loadTransactions(),
          })
        ),
        store as Store<TransactionsPartialState>,
        mockTransactionsApiService as never
      );
      store.overrideSelector(getDateFilter, dateFilter);
      store.overrideSelector(getStatusFilter, statusFilter);
      store.overrideSelector(getPageNumber, pageNumber);
    });

    it('should emit loadTransactionsSuccess when the call succeeds', () => {
      mockGetTransactions.mockImplementation(() =>
        cold('----(a|)', {
          a: mockApiResponse,
        })
      );

      const expected$ = cold('---------a', {
        a: TransactionsActions.loadTransactionsSuccess({
          apiResponse: mockApiResponse,
        }),
      });

      expect(effects.loadTransactions$).toBeObservable(expected$);
    });

    it('should emit loadTransactionsFailure when the call fails', () => {
      mockGetTransactions.mockImplementation(() => cold('----#', {}, error));

      const expected$ = cold('---------a', {
        a: TransactionsActions.loadTransactionsFailure({
          error: error,
        }),
      });

      expect(effects.loadTransactions$).toBeObservable(expected$);
    });

    it('should call getTransactions with the right arguments', () => {
      mockGetTransactions.mockImplementation(() => cold('---'));
      expect(effects.loadTransactions$).toSatisfyOnFlush(() => {
        expect(mockGetTransactions).toHaveBeenCalledWith(
          dateFilter,
          statusFilter,
          pageNumber
        );
      });
    });
  });

  describe('filterTransactions$', () => {
    beforeEach(() => {
      effects = new TransactionsEffects(
        new Actions(
          hot('--a--b--c', {
            a: TransactionsActions.paginate({ page: pageNumber }),
            b: TransactionsActions.filterByDate({ date: dateFilter }),
            c: TransactionsActions.filterByStatus({ status: statusFilter }),
          })
        ),
        store as Store<TransactionsPartialState>,
        mockTransactionsApiService as never
      );
    });

    it('should emit loadTransactions', () => {
      const expected$ = cold('--a--a--a', {
        a: TransactionsActions.loadTransactions(),
      });

      expect(effects.filterTransactions$).toBeObservable(expected$);
    });
  });
});
