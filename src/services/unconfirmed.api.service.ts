import environment from '../config/environment';
import { fetchStruct } from '../utils/fetchStruct';
import { GET_UNCONFIRMED_TRANSACTIONS_STRUCT } from '../constants/struct.types';

export class UnconfirmedTransactionsService {
  static get apiUrl(): string {
    return `${environment.apiUrl}`;
  }

  static getTransationList(
    dispatch: any,
    { limit, offset, sortBy, sortDirection }: any
  ): any {
    return fetchStruct(
      GET_UNCONFIRMED_TRANSACTIONS_STRUCT,
      {
        method: 'get',
        url: `${UnconfirmedTransactionsService.apiUrl}/pageTxs`,
        params: {
          pageCount: limit,
          pageIndex: offset || 1,
        },
      },
      {
        dispatch,
      }
    );
  }
}
