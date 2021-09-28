import { Shallow } from 'shallow-render';
import { BehaviorSubject } from 'rxjs';
import { LetModule } from '@rx-angular/template';
import {
  TransactionListStore,
  TransactionListViewModel,
} from './transaction-list.store';
import { MOCK_RESPONSE } from './mock-data';
import { TransactionListComponent } from './transaction-list.component';
import { TransactionsviewerFeatureTransactionListModule } from '../transactionsviewer-feature-transaction-list.module';
import { PageEvent } from '@angular/material/paginator';

describe('TransactionListComponent', () => {
  const vm = {
    transactions: MOCK_RESPONSE.items,
    transactionCount: MOCK_RESPONSE.items.length,
    page: 1,
    loading: false,
    failure: false,
    empty: false,
    success: true,
  } as TransactionListViewModel;

  const mockFilterByStatus = jest.fn();
  const mockFilterByDate = jest.fn();
  const mockPaginate = jest.fn();
  const dateFilter = 'dateFilter';
  const statusFilter = 'COMPLETED';
  const pageNumber = 4;

  const vmSubject = new BehaviorSubject<TransactionListViewModel>(vm);

  const mockTransactionListStore = {
    vm$: vmSubject.asObservable(),
    filterByStatus: mockFilterByStatus,
    filterByDate: mockFilterByDate,
    paginate: mockPaginate,
  };

  let shallow: Shallow<TransactionListComponent>;
  beforeEach(() => {
    shallow = new Shallow(
      TransactionListComponent,
      TransactionsviewerFeatureTransactionListModule
    )
      .provideMock([
        {
          provide: TransactionListStore,
          useValue: mockTransactionListStore,
        },
      ])
      .dontMock(LetModule);
  });

  it('should pass the correct inputs to vyne-transactions-list', async () => {
    const { find } = await shallow.render();
    const componentInstance = find('vyne-transactions-list').componentInstance;
    expect(componentInstance.transactions).toEqual(vm.transactions);
  });

  it('should pass the correct inputs to mat-paginator', async () => {
    const { find } = await shallow.render();
    const componentInstance = find('mat-paginator').componentInstance;
    expect(componentInstance.length).toEqual(vm.transactionCount);
    expect(componentInstance.pageIndex).toEqual(vm.page);
    expect(componentInstance.pageSize).toEqual(5);
    expect(componentInstance.pageSizeOptions).toEqual([5]);
  });

  describe('statusChanged event', () => {
    it('should call filterByStatus on the store service', async () => {
      const { find } = await shallow.render();
      const debugElement = find('vyne-transactions-filter');
      debugElement.triggerEventHandler('statusChanged', statusFilter);
      expect(mockTransactionListStore.filterByStatus).toHaveBeenCalledWith(
        statusFilter
      );
    });
  });

  describe('dateChanged event', () => {
    it('should call filterByDate on the store service', async () => {
      const { find } = await shallow.render();
      const debugElement = find('vyne-transactions-filter');
      debugElement.triggerEventHandler('dateChanged', dateFilter);
      expect(mockTransactionListStore.filterByDate).toHaveBeenCalledWith(
        dateFilter
      );
    });
  });

  describe('page event', () => {
    it('should call paginate on the store service', async () => {
      const { find } = await shallow.render();
      const debugElement = find('mat-paginator');
      debugElement.triggerEventHandler('page', {
        pageIndex: pageNumber,
      } as PageEvent);
      expect(mockTransactionListStore.paginate).toHaveBeenCalledWith({
        pageIndex: pageNumber,
      });
    });
  });
});
