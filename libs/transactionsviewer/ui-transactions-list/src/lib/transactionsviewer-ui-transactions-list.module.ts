import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { TransactionsFilterComponent } from './transactions-filter/transactions-filter.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    TransactionsListComponent,
    TransactionsFilterComponent
  ],
})
export class TransactionsviewerUiTransactionsListModule {}
