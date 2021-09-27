import { createAction, props } from '@ngrx/store';
import {
  TransactionsApiResponse,
  TransactionStatus,
} from '@transactionsviewer/util-models';

export const enterTransactionsPage = createAction('[Transactions Page] Enter');

export const loadTransactions = createAction(
  '[TransactionsEffects] Load Transactions'
);

export const loadTransactionsSuccess = createAction(
  '[TransactionsEffects] Load Transactions Success',
  props<{ apiResponse: TransactionsApiResponse }>()
);

export const loadTransactionsFailure = createAction(
  '[TransactionsEffects] Load Transactions Failure',
  props<{ error: Error }>()
);

export const paginate = createAction(
  '[Transactions Page] Paginate transactions',
  props<{ page: number }>()
);

export const filterByStatus = createAction(
  '[Transactions Page] Filter transactions by status',
  props<{ status: TransactionStatus }>()
);

export const filterByDate = createAction(
  '[Transactions Page] Filter transactions by Date',
  props<{ date: string }>()
);
