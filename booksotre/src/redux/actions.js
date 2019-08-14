import { ADD_BOOK, DEL_BOOK } from './actionTypes';

export const addBook = book => ({
  type: ADD_BOOK,
  payload: book,
});

export const delBook = id => ({
  type: DEL_BOOK,
  payload: { id },
});
