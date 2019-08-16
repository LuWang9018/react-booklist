import { ADD_BOOK, DEL_BOOK, EDIT_BOOK } from './actionTypes';
import { CHANGE_EDITWINDOW_STATE } from './actionTypes';

export const addBook = book => ({
  type: ADD_BOOK,
  payload: book,
});

export const delBook = id => ({
  type: DEL_BOOK,
  payload: { id },
});

export const editBook = book => ({
  type: EDIT_BOOK,
  payload: book,
});

export const changeEditState = (editWindowState, data) => ({
  type: CHANGE_EDITWINDOW_STATE,
  payload: { editWindowState, data },
});
