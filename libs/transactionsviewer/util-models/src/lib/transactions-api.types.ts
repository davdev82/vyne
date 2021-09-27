import { Transaction } from './transaction.types';

export interface TransactionsApiResponse {
  numberOfPages: number;
  totalNumberOfItems: number;
  items: Transaction[];
}
