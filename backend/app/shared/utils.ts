import * as querystring from 'querystring';
import { UNUSUAL } from './constants';
import { IResponse, IInternal } from './constants';

interface IParams {
  [key: string]: any;
}

export function createRedirectURL(env: string, parames?: IParams): string {
  return env === 'local' ? (
    parames ? `http://localhost:8999/dev?${querystring.stringify(parames)}` : 'http://localhost:8999/dev'
  ) : (
    ''
  );
}

export function structureResponse<T>(data: T, statusCode = UNUSUAL, errorMessage?: string): IResponse<T>{
  const obj = Object.create(null);
  obj.data = data;
  obj.statusCode = statusCode;
  obj.errorMessage = errorMessage;
  return obj;
}

export function internalServiceResponse<T>(code: number, data: T, msg = ''): IInternal<T> {
  return {
    code,
    data,
    msg,
  };
}
