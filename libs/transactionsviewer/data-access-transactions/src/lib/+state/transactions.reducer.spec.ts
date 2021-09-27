import { Action } from '@ngrx/store';

import * as TransactionsActions from './transactions.actions';
import { TransactionsEntity } from './transactions.models';
import { State, initialState, reducer } from './transactions.reducer';

describe('Transactions Reducer', () => {
  const createTransactionsEntity = (
    id: string,
    name = ''
  ): TransactionsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Transactions actions', () => {
    it('loadTransactionsSuccess should return the list of known Transactions', () => {
      const transactions = [
        createTransactionsEntity('PRODUCT-AAA'),
        createTransactionsEntity('PRODUCT-zzz'),
      ];
      const action = TransactionsActions.loadTransactionsSuccess({
        transactions,
      });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
