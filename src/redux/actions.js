export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';
export const SET_SORT_BY = 'SET_SORT_BY';
export const SET_SORT_ORDER = 'SET_SORT_ORDER';

export const fetchBooks = () => (dispatch) => {
    dispatch({ type: FETCH_BOOKS_REQUEST });

    const API_URL = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=YOUR_API_KEY';

    return fetch(API_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }

            return response.json();
        })
        .then((data) => {
            const books = Array.isArray(data?.results?.books)
                ? data.results.books
                : Array.isArray(data)
                    ? data
                    : [];

            dispatch({ type: FETCH_BOOKS_SUCCESS, payload: books });
        })
        .catch((error) => {
            dispatch({ type: FETCH_BOOKS_FAILURE, payload: error.message || 'Something went wrong' });
        });
};

export const setSortBy = (criteria) => ({
    type: SET_SORT_BY,
    payload: criteria,
});

export const setSortOrder = (order) => ({
    type: SET_SORT_ORDER,
    payload: order,
});