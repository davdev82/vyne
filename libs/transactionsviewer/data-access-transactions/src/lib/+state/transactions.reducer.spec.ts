import {
  RemoteDataState,
  TransactionsApiResponse,
} from '@transactionsviewer/util-models';
import {
  filterByDate,
  filterByStatus,
  loadTransactions,
  loadTransactionsFailure,
  loadTransactionsSuccess,
  paginate,
} from './transactions.actions';
import {
  initialState,
  reducer,
  TransactionsState,
} from './transactions.reducer';

describe('transactionsReducer', () => {
  const mockApiResponse: TransactionsApiResponse = {
    items: [],
    totalNumberOfItems: 25,
  } as unknown as TransactionsApiResponse;

  const mockError = new Error();

  let currentState: TransactionsState = {} as unknown as TransactionsState;
  beforeEach(() => {
    currentState = {
      ...initialState,
    };
  });

  describe('loadTransactions', () => {
    it('should update the remoteState to loading', () => {
      const result = reducer(currentState, loadTransactions());

      expect(result.remoteState).toEqual(
        expect.objectContaining({
          kind: RemoteDataState.Loading,
        })
      );
    });

    it('should update the transactions to null', () => {
      const result = reducer(currentState, loadTransactions());
      expect(result.transactions).toBeNull();
    });
  });

  describe('loadTransactionsSuccess', () => {
    it('should update the remoteState to success', () => {
      const result = reducer(
        currentState,
        loadTransactionsSuccess({ apiResponse: mockApiResponse })
      );

      expect(result.remoteState).toEqual(
        expect.objectContaining({
          kind: RemoteDataState.OK,
        })
      );
    });

    it('should update the transactions to the api response', () => {
      const result = reducer(
        currentState,
        loadTransactionsSuccess({ apiResponse: mockApiResponse })
      );

      expect(result.transactions).toEqual(mockApiResponse.items);
      expect(result.totalNumberOfItems).toEqual(
        mockApiResponse.totalNumberOfItems
      );
    });
  });

  describe('loadTransactionsFailure', () => {
    it('should update the remoteState to error', () => {
      const result = reducer(
        currentState,
        loadTransactionsFailure({ error: mockError })
      );

      expect(result.remoteState).toEqual(
        expect.objectContaining({
          kind: RemoteDataState.Error,
        })
      );
    });
  });

  describe('filterByDate', () => {
    it('should update the dateFilter in the state', () => {
      const result = reducer(
        currentState,
        filterByDate({ date: '06/07/1982' })
      );

      expect(result.dateFilter).toEqual('06/07/1982');
    });

    it('should reset the page number', () => {
      const result = reducer(
        currentState,
        filterByDate({ date: '06/07/1982' })
      );

      expect(result.page).toEqual(0);
    });
  });

  describe('filterByStatus', () => {
    it('should update the status in the state', () => {
      const result = reducer(
        currentState,
        filterByStatus({ status: 'CAPTURED' })
      );

      expect(result.statusFilter).toEqual('CAPTURED');
    });

    it('should reset the page number', () => {
      const result = reducer(
        currentState,
        filterByStatus({ status: 'CAPTURED' })
      );

      expect(result.page).toEqual(0);
    });
  });

  describe('paginate', () => {
    it('should update the page number', () => {
      const result = reducer(currentState, paginate({ page: 5 }));
      expect(result.page).toEqual(5);
    });
  });
});
