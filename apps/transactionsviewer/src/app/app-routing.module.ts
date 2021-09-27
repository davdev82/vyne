import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/list',
  },
  {
    path: 'list',
    loadChildren: () =>
      import('@transactionsviewer/feature-transactions-list').then(
        (m) => m.TransactionsviewerFeatureTransactionListModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      paramsInheritanceStrategy: 'always',
      relativeLinkResolution: 'corrected',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
