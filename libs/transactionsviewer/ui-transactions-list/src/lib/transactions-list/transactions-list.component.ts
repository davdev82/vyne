import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { Transaction } from '@transactionsviewer/util-models';
import * as moment from 'moment';
@Component({
  selector: 'vyne-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsListComponent {
  @Input() transactions: Transaction[] | null = null;

  formatDateForDisplay(date: string) {
    return moment(date).format('DD/MM/YYYY');
  }
}
