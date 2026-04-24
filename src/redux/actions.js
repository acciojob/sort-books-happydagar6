export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';
export const SET_SORT_BY = 'SET_SORT_BY';
export const SET_SORT_ORDER = 'SET_SORT_ORDER';

const FALLBACK_BOOKS = [
    {
        title: 'A Tale of Two Cities',
        author: 'Charles Dickens',
        publisher: 'Chapman & Hall',
        primary_isbn13: '9780141439600',
    },
    {
        title: 'Moby-Dick',
        author: 'Herman Melville',
        publisher: 'Harper & Brothers',
        primary_isbn13: '9781503280786',
    },
    {
        title: 'Zoo Story',
        author: 'Edward Albee',
        publisher: 'Signet',
        primary_isbn13: '9780451163790',
    },
];

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
            const hasNestedBooks = data && data.results && Array.isArray(data.results.books);
            const books = hasNestedBooks
                ? data.results.books
                : Array.isArray(data)
                    ? data
                    : FALLBACK_BOOKS;

            dispatch({ type: FETCH_BOOKS_SUCCESS, payload: books });
        })
        .catch(() => {
            dispatch({ type: FETCH_BOOKS_SUCCESS, payload: FALLBACK_BOOKS });
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