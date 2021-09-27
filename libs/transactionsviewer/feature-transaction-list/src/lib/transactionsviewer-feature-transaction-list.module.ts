import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { RouterModule } from '@angular/router';
import { TransactionsviewerDataAccessTransactionsModule } from '@transactionsviewer/data-access-transactions';

@NgModule({
  imports: [
    CommonModule,
    TransactionsviewerDataAccessTransactionsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: TransactionListComponent,
      },
    ]),
  ],

  declarations: [TransactionListComponent],
})
export class TransactionsviewerFeatureTransactionListModule {}
