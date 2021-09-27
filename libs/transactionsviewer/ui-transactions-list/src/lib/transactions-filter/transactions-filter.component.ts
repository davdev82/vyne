import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { TransactionStatus } from '@transactionsviewer/util-models';
import { Moment } from 'moment';
@Component({
  selector: 'vyne-transactions-filter',
  templateUrl: './transactions-filter.component.html',
  styleUrls: ['./transactions-filter.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsFilterComponent {
  statuses: Array<{ display: string; value: TransactionStatus }> = [
    { value: 'CAPTURED', display: 'Captured' },
    { value: 'COMPLETED', display: 'Completed' },
    { value: 'CREATED', display: 'Created' },
    { value: 'FAILED', display: 'Failed' },
    { value: 'SETTLED', display: 'Settled' },
  ];

  @Output() statusChanged = new EventEmitter<TransactionStatus>();
  @Output() dateChanged = new EventEmitter<string>();

  handleSelectionChange(change: MatSelectChange) {
    this.statusChanged.emit(change.value);
  }

  handleDateChange(dateChange: MatDatepickerInputEvent<Moment>) {
    this.dateChanged.emit(dateChange.value?.toISOString(true));
  }
}
