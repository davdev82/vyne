import { PageEvent } from '@angular/material/paginator';
import { TransactionsFacade } from '@transactionsviewer/data-access-transactions';
import { of } from 'rxjs';
import { MOCK_RESPONSE } from './mock-data';
import { TransactionListStore } from './transaction-list.store';

describe('TransactionListStore', () => {
  const receivedState = {
    next: jest.fn(),
    complete: jest.fn(),
    error: jest.fn(),
  };

  let storeService: TransactionListStore;
  const mockFilterByStatus = jest.fn();
  const mockFilterByDate = jest.fn();
  const mockPaginate = jest.fn();

  const dateFilter = 'dateFilter';
  const statusFilter = 'COMPLETED';
  const pageNumber = 4;

  const mockTransactionsFacade = {
    transactions$: of(MOCK_RESPONSE.items),
    transactionsCount$: of(MOCK_RESPONSE.items.length),
    page$: of(0),
    isTransactionsLoading$: of(false),
    isTransactionsFailure$: of(false),
    isTransactionsEmpty$: of(false),
    isTransactionsSuccess$: of(true),
    filterByStatus: mockFilterByStatus,
    filterByDate: mockFilterByDate,
    paginate: mockPaginate,
  } as unknown as TransactionsFacade;

  beforeEach(() => {
    receivedState.next.mockClear();
    receivedState.complete.mockClear();
    receivedState.error.mockClear();
    mockFilterByStatus.mockClear();
    mockFilterByDate.mockClear();
    mockPaginate.mockClear();
    storeService = new TransactionListStore(mockTransactionsFacade);
  });

  describe('filterByStatus', () => {
    it('should call filterByStatus method on the facade', () => {
      storeService.filterByStatus(statusFilter);
      expect(mockFilterByStatus).toHaveBeenCalledWith(statusFilter);
    });
  });

  describe('filterByDate', () => {
    it('should call filterByDate method on the facade', () => {
      storeService.filterByDate(dateFilter);
      expect(mockFilterByDate).toHaveBeenCalledWith(dateFilter);
    });
  });

  describe('paginate', () => {
    it('should call paginate method on the facade', () => {
      storeService.paginate({ pageIndex: pageNumber } as PageEvent);
      expect(mockPaginate).toHaveBeenCalledWith(pageNumber);
    });
  });

  it('vm$ should correctly return an object representing vm', () => {
    storeService.vm$.subscribe(receivedState);
    expect(receivedState.next).toBeCalledWith(
      expect.objectContaining({
        transactions: expect.anything(),
        transactionCount: expect.anything(),
        page: expect.anything(),
        loading: expect.anything(),
        failure: expect.anything(),
        empty: expect.anything(),
        success: expect.anything(),
      })
    );
  });
});
