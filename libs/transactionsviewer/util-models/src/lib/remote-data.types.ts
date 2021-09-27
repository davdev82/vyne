export enum RemoteDataState {
  NotFetched = 'notFetched',
  Loading = 'loading',
  Error = 'error',
  OK = 'ok',
}

export interface RemoteDataNotFetched {
  kind: RemoteDataState.NotFetched;
}

export interface RemoteDataLoading {
  kind: RemoteDataState.Loading;
}

export interface RemoteDataOK<T = unknown> {
  kind: RemoteDataState.OK;
  data: T;
}

export interface RemoteDataError {
  kind: RemoteDataState.Error;
  error: Error;
}

export type RemoteData<T = unknown> =
  | RemoteDataNotFetched
  | RemoteDataLoading
  | RemoteDataOK<T>
  | RemoteDataError;

export function isRemoteDataOK(
  remoteData: RemoteData
): remoteData is RemoteDataOK {
  return remoteData.kind === RemoteDataState.OK;
}

export function isRemoteDataError(
  remoteData: RemoteData
): remoteData is RemoteDataError {
  return remoteData.kind === RemoteDataState.Error;
}

export function isRemoteDataLoading(
  remoteData: RemoteData
): remoteData is RemoteDataLoading {
  return remoteData.kind === RemoteDataState.Loading;
}

export function isRemoteDataNotFetched(
  remoteData: RemoteData
): remoteData is RemoteDataNotFetched {
  return remoteData.kind === RemoteDataState.NotFetched;
}

export function remoteDataLoading(): RemoteDataLoading {
  return {
    kind: RemoteDataState.Loading,
  };
}

export function remoteDataNotFetched(): RemoteDataNotFetched {
  return {
    kind: RemoteDataState.NotFetched,
  };
}

export function remoteDataOK<T>(data: T): RemoteDataOK<T> {
  return {
    kind: RemoteDataState.OK,
    data,
  };
}

export function remoteDataError(error: Error): RemoteDataError {
  return {
    kind: RemoteDataState.Error,
    error,
  };
}
