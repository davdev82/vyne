import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as TransactionsActions from './transactions.actions';
import { TransactionsEffects } from './transactions.effects';
import { TransactionsFacade } from './transactions.facade';
import { TransactionsEntity } from './transactions.models';
import {
  TRANSACTIONS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './transactions.reducer';
import * as TransactionsSelectors from './transactions.selectors';

interface TestSchema {
  transactions: State;
}

describe('TransactionsFacade', () => {
  let facade: TransactionsFacade;
  let store: Store<TestSchema>;
  const createTransactionsEntity = (
    id: string,
    name = ''
  ): TransactionsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TRANSACTIONS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([TransactionsEffects]),
        ],
        providers: [TransactionsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(TransactionsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allTransactions$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allTransactions$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadTransactionsSuccess` to manually update list
     */
    it('allTransactions$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allTransactions$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        TransactionsActions.loadTransactionsSuccess({
          transactions: [
            createTransactionsEntity('AAA'),
            createTransactionsEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allTransactions$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
