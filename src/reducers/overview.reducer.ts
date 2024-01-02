import { CLEAR_APP_PRELOADED_STATE } from '../actions/app.actions';
import { GET_OVERVIEW, GET_OVERVIEW_SUCCESS } from '../constants/overview.types';

export interface OverviewState {
  fetching: boolean;
  data?: any;
  stats?: any;
  preloaded: boolean;
}

export const initialState: OverviewState = {
  fetching: false,
  preloaded: false,
};

export function overviewReducer(
  state: OverviewState = initialState,
  action: any
): OverviewState {
  
  switch (action.type) {
    
    case GET_OVERVIEW: {
      return {
        ...state,
        fetching: true,
      };
    }

    case GET_OVERVIEW_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        fetching: false,
      };
    }

    case CLEAR_APP_PRELOADED_STATE: {
      return {
        ...state,
        preloaded: false,
      };
    }

    default:
      return { ...state };
  }
}
