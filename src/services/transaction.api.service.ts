import axios, { AxiosResponse } from 'axios';
import environment from '../config/environment';

export class TransactionApiService {
  static get apiUrl(): string {
    return `${environment.apiUrlV1}/tx_info`;
  }

  static getTransaction(id: string): any {
    return axios
      .get(`${TransactionApiService.apiUrl}`,{
        params:{
          txid:id
        }
      })
      .then((response: AxiosResponse) => {
        if (!response) {
          return Promise.reject(
            `Transaction api service. Request: ${TransactionApiService.apiUrl}/${id}.`
          );
        }

        return response.data.result;
      });
  }
}
