import { CHANGE_EDITWINDOW_STATE } from '../actionTypes';

const initialState = {
  editWindowState: false,
  data: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_EDITWINDOW_STATE: {
      return {
        ...state,
        editWindowState: action.payload.editWindowState,
        currentEditing: action.payload.data,
      };
    }
    default:
      return state;
  }
}
