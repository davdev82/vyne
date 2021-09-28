import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { TransactionsFacade } from './transactions.facade';
import {
  enterTransactionsPage,
  filterByDate,
  filterByStatus,
  paginate,
} from './transactions.actions';

describe('TransactionsFacade', () => {
  let facade: TransactionsFacade;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...provideMockStore(), TransactionsFacade],
    });

    facade = TestBed.inject(TransactionsFacade);
    store = TestBed.inject(Store) as MockStore;
    store.dispatch = jest.fn();
  });

  it('enter() dispatches enterTransactionsPage action to the store', () => {
    facade.enter();
    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: enterTransactionsPage.type,
      })
    );
  });

  it('paginate() dispatches paginate action to the store with the right arguments', () => {
    const pageNumber = 4;
    facade.paginate(pageNumber);
    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: paginate.type,
        page: pageNumber,
      })
    );
  });

  it('filterByStatus() dispatches filterByStatus action to the store with the right arguments', () => {
    const statusFilter = 'COMPLETED';
    facade.filterByStatus(statusFilter);
    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: filterByStatus.type,
        status: statusFilter,
      })
    );
  });

  it('filterByDate() dispatches filterByDate action to the store with the right arguments', () => {
    const dateFilter = 'dateFilter';
    facade.filterByDate(dateFilter);
    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: filterByDate.type,
        date: dateFilter,
      })
    );
  });
});
