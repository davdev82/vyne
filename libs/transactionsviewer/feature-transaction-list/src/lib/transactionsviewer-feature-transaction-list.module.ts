import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { RouterModule } from '@angular/router';
import { TransactionsviewerDataAccessTransactionsModule } from '@transactionsviewer/data-access-transactions';
import { TransactionsviewerUiTransactionsListModule } from '@transactionsviewer/ui-transactions-list';
import { LetModule } from '@rx-angular/template';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    TransactionsviewerDataAccessTransactionsModule,
    TransactionsviewerUiTransactionsListModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    LetModule,
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
