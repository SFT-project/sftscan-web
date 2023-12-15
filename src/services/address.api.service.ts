import { GET_ADDRESSES_BALANCES_STRUCT } from './../constants/struct.types';
import axios, { AxiosResponse } from 'axios';

import environment from '../config/environment';
import { fetchStruct } from 'src/utils/fetchStruct';

export class AddressApiService {
  static get apiUrl(): string {
    return `${environment.apiUrl}/addresses`;
  }

  static getAddress(id: string): any {
    return axios
      .get(`${environment.apiUrlV1}/balance`,{
        params:{
          addr:id
        }
      })
      .then((response: AxiosResponse) => {
        if (!response) {
          return Promise.reject(
            `Address api service. Request: ${environment.apiUrlV1}/addresses/${id}/balance/total.`
          );
        }
        console.log(response.data);
        
        return response.data;
      });
  }

  static getConfirmed(id: string, params: any) {
    return axios
    .get(`${environment.apiUrlV1}/pageAddrTxs`, {
      params:{
        pageIndex:params.offset || 1,
        pageCount:params.limit,
        addr:id
      },
    })
      .then((response: AxiosResponse) => {
        if (!response) {
          return Promise.reject(
            `Address api service. Request: ${environment.apiUrlV1}/addresses/${id}/transactions.`
          );
        }

        return response.data;
      });
  }

  static getUnconfirmed(id: string, params: any) {
    return axios
      .get(`${environment.apiUrlV1}/pageAddrTxs`, {
        params:{
          pageIndex:params.offset || 1,
        pageCount:params.limit,
          addr:id
        },
      })
      .then((response: AxiosResponse) => {
        if (!response) {
          return Promise.reject(
            `Address api service. Request: ${environment.apiUrlV1}/mempool/transactions/byAddress/${id}`
          );
        }

        return response.data;
      });
  }

  static async getAddressTransactions(id: string, params: any): Promise<any> {
    const { offset, limit } = params;
    const unconfirmed = await this.getUnconfirmed(id, { offset, limit });

    if (unconfirmed.total === 0 || unconfirmed.total < offset) {
      const confirmed = await this.getConfirmed(id, {
        offset: offset ,
        limit,
      });

      return {
        items: confirmed.list,
        total:  confirmed.total,
      };
    }
    console.log(unconfirmed,'unconfirmed');
    
    if (unconfirmed.list.length < limit) {
      const newLimit = limit - unconfirmed.list.length;

      const confirmed = await this.getConfirmed(id, {
        offset: 1,
        limit: newLimit,
      });

      return {
        items: confirmed,
        total:  confirmed.total,
      };
    }

 

    return {
      items: unconfirmed,
      total: unconfirmed.total ,
    };
  }

  static getAddressesBalances(dispatch: any): any {
    return fetchStruct(
      GET_ADDRESSES_BALANCES_STRUCT,
      {
        method: 'get',
        url: `https://api.ergo.watch/lists/addresses/by/balance?limit=100`,
      },
      {
        dispatch,
      }
    );
  }
}
