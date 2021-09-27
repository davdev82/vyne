import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TransactionsApiResponse } from '@transactionsviewer/util-models';
import { catchError, delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { MOCK_RESPONSE } from './mock-data';

@Injectable()
export class TransactionsApiService {
  api = 'http://localhost:8080/api/v1';

  constructor(private httpClient: HttpClient) {}

  getTransactions(
    dateFilter: string | null,
    statusFilter: string | null,
    page: number
  ) {
    let params = new HttpParams();
    params.append('page', page);
    params = dateFilter ? params.append('date', dateFilter) : params;
    params = statusFilter ? params.append('status', statusFilter) : params;

    return this.httpClient
      .get<TransactionsApiResponse>(`${this.api}/payments`, {
        headers: {
          ...this.getHeaders(),
        },
        params,
      })
      .pipe(catchError(() => of(MOCK_RESPONSE).pipe(delay(500))));
  }

  private getHeaders() {
    return {
      Authorization: 'Basic dXNlcjp1c2VyUGFzcw==',
    };
  }
}
