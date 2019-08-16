import { combineReducers } from 'redux';
import books from './books';
import editWindow from './editWindow';

export default combineReducers({ books, editWindow });
