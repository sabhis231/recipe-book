import { User } from './../../../shared/model/user.model';
import * as authAction from '../actions/auth.actions';

export interface State {
  user: User;
  isLoading: boolean;
  error: string;
}

const initialState: State = {
  user: null,
  isLoading: false,
  error: null,
};

export function authReducer(
  state = initialState,
  action: authAction.AuthActionsType
) {
  switch (action.type) {
    case authAction.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case authAction.LOGIN_DONE:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case authAction.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        isLoading: false,
        error: action.payload,
      };
    case authAction.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default: {
      return state;
    }
  }
}
