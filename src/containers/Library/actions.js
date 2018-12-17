// API
import libraryAPI from './api';

// Actions
const LIBRARY_LIST_BOOKS = 'LIBRARY_LIST_BOOKS';
const LIBRARY_SHOW_SINGLE_BOOK = 'LIBRARY_SHOW_SINGLE_BOOK';

export function loadBooks() {
  return {
    type: LIBRARY_LIST_BOOKS,
    payload: libraryAPI.getAllBooks()
  };
}

export function loadSingleBook(query) {
  return {
    type: LIBRARY_SHOW_SINGLE_BOOK,
    payload: libraryAPI.getSingleBook(query)
  };
}
