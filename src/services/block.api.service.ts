import axios, { AxiosResponse } from 'axios';
import environment from '../config/environment';

export interface IGetBlocksParams {
  limit?: number;
  offset?: number;
  startDate?: number | null;
  endDate?: number | null;
  sortBy?: string;
  sortDirection?: string;
  searchQuery?: string;
}

export class BlockApiService {
  static get apiUrl(): string {
    return `${environment.apiUrl}/blocks`;
  }

  static getBlock(id: string): any {
    return axios
      .get(`${environment.apiUrl}/getBlock`,{
        params: {
          hash:id
        },
      })
      .then((response: AxiosResponse) => {
        console.log(response.data,'response.data');
        
        if (!response) {
          return Promise.reject(
            `Block api service. Request: ${BlockApiService.apiUrl}/${id}.`
          );
        }

        return response.data;
      });
  }

  static getBlocks({
    limit,
    sortDirection,
    startDate,
  }: IGetBlocksParams): any {
    return axios
      .get(`${BlockApiService.apiUrl}`, {
        params: {
          pageCount:limit,
          asc: sortDirection || 'desc',
          pageIndex:startDate||0,
        },
      })
      .then((response: AxiosResponse) => {
        if (!response) {
          return Promise.reject(
            `Block api service. Request: ${BlockApiService.apiUrl}.`
          );
        }

        return response.data.list;
      })
      .catch(err=>{
        console.log(err,'err');
        
      })
  }
}
