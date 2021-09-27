import { TransactionsApiResponse } from '@transactionsviewer/util-models';

export const MOCK_RESPONSE = {
  totalNumberOfItems: 25,
  numberOfPages: 5,
  currentPage: 0,
  pageSize: 5,
  hasNext: true,
  items: [
    {
      id: 'TXID_sdfb-sodj-3gb34-3r3brb',
      amount: 23.35,
      currency: 'GBP',
      description: 'Test payment made only for this technical task #1',
      status: 'CREATED',
      createdAt: '2021-07-01T12:27:07.965',
    },
    {
      id: 'TXID_fdgn-sodj-3gb34-3r3brb',
      amount: 34.34,
      currency: 'EUR',
      description: 'Test payment made only for this technical task #2',
      status: 'FAILED',
      createdAt: '2021-07-03T12:27:07.965',
    },
    {
      id: 'TXID_sdfb-fgn-3gb34-3r3brb',
      amount: 46.467,
      currency: 'GBP',
      description: 'Test payment made only for this technical task #3',
      status: 'SETTLED',
      createdAt: '2021-04-01T12:27:07.965',
    },
    {
      id: 'TXID_sdfb-sodj-sdg-3r3brb',
      amount: 2.24,
      currency: 'USD',
      description: 'Test payment made only for this technical task #4',
      status: 'COMPLETED',
      createdAt: '2021-07-03T12:27:07.965',
    },
    {
      id: 'TXID_sdfb-sodj-h45-3r3brb',
      amount: 35.475,
      currency: 'GBP',
      description: 'Test payment made only for this technical task #5',
      status: 'CAPTURED',
      createdAt: '2021-04-01T12:27:07.965',
    },
  ],
} as TransactionsApiResponse;
