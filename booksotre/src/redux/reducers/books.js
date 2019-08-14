const initialState = {
  books: [
    {
      name: 'JS from begining to give up',
      price: 0.01,
      category: 'Educational',
    },
  ],
};

//action types
const ADD_BOOK = 'ADD_BOOK';
const DEL_BOOK = 'DEL_BOOK';

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_BOOK: {
      const { book } = action.payload;
      return {
        ...state,
        books: [...state.books, book],
      };
    }
    // case DEL_BOOK: {
    //   const { id } = action.payload;
    //   return {
    //     ...state,
    //     byIds: {
    //       ...state.byIds,
    //       [id]: {
    //         ...state.byIds[id],
    //         completed: !state.byIds[id].completed,
    //       },
    //     },
    //   };
    // }
    default:
      return state;
  }
}
