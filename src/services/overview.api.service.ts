import axios, { AxiosResponse } from 'axios';

import environment from '../config/environment';

export class OverviweApiService {
  static info(): any {
    return axios
      .get(`${environment.apiUrl}/getInfo`)
      .then((response: AxiosResponse) => {
        if (!response) {
          return Promise.reject(
            `Block api service. Request: ${environment.apiUrl}/search.`
          );
        }

        return response.data;
      });
  }
}
