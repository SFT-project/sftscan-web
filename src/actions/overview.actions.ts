import { Action, ActionCreatorsMapObject, Dispatch } from 'redux';
import { GET_OVERVIEW, GET_OVERVIEW_SUCCESS } from '../constants/overview.types';

import { OverviweApiService } from '../services/overview.api.service';

export interface OverviewAction extends ActionCreatorsMapObject {
  overviewInfo: () => any;
}

export const OverviewAction: OverviewAction = {
  overviewInfo(): any {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: GET_OVERVIEW,
      });

      return OverviweApiService.info().then((data: any) => {
        dispatch({
          payload: {
            data,
          },
          type: GET_OVERVIEW_SUCCESS,
        });
      });
    };
  },
};
