import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TransactionStatus } from '@transactionsviewer/util-models';
import { TransactionListStore } from './transaction-list.store';

@Component({
  selector: 'vyne-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TransactionListStore],
})
export class TransactionListComponent {
  vm$ = this.componentStore.vm$;

  constructor(private componentStore: TransactionListStore) {}

  filterByStatus(status: TransactionStatus) {
    this.componentStore.filterByStatus(status);
  }

  filterByDate(date: string) {
    this.componentStore.filterByDate(date);
  }

  paginate(page: number) {
    this.componentStore.paginate(page);
  }
}
