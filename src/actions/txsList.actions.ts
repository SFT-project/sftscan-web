import { ActionCreatorsMapObject } from 'redux';
import { GET_UNCONFIRMED_TRANSACTIONS_SUCCESS } from '../constants/unconfirmed.types';
import { UnconfirmedTransactionsService } from '../services/unconfirmed.api.service';

export interface TxsList
  extends ActionCreatorsMapObject {
  getTxsList: (params: any) => any;
}

export const TxsList: TxsList= {
  getTxsList(params: any) {
    return (dispatch: any) =>
      UnconfirmedTransactionsService.getTransationList(
        dispatch,
        params
      ).then((data: any) => {
        dispatch({
          payload: {
            offset: params.offset || 1,
            data:data.list
          },
          type: GET_UNCONFIRMED_TRANSACTIONS_SUCCESS,
        });
      });
  },
};
