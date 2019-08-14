import uuid from 'uuid';

import { ADD_BOOK, DEL_BOOK } from '../actionTypes';

const initialState = {
  books: [
    {
      id: uuid(),
      name: 'JS From Begining To Give Up',
      price: 0.01,
      category: 'Educational',
    },
  ],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_BOOK: {
      const { book } = action.payload;
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
    default:
      return state;
  }
}
