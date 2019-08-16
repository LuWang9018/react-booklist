import uuid from 'uuid';

import { ADD_BOOK, DEL_BOOK, EDIT_BOOK } from '../actionTypes';

const initialState = {
  books: [
    {
      id: uuid(),
      name: 'JS From Begining To Give Up',
      price: 0.01,
      category: 'Educational',
      description: 'This is a demo book',
    },
  ],
  editWindowState: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_BOOK: {
      const book = action.payload;
      book.id = uuid();
      return {
        ...state,
        books: [...state.books, book],
      };
    }
    case DEL_BOOK: {
      const { id } = action.payload;
      let newBookList = Object.assign([], state.books);
      newBookList = newBookList.filter(function(obj) {
        return obj.id !== id;
      });

      return {
        ...state,
        books: newBookList,
      };
    }
    case EDIT_BOOK: {
      const { id } = action.payload;

      let newBookList = Object.assign([], state.books);

      for (let i = 0; i < newBookList.length; i++) {
        if (newBookList[i].id === id) {
          newBookList[i] = action.payload;
        }
      }

      return {
        ...state,
        books: newBookList,
      };
    }
    default:
      return state;
  }
}
