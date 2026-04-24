import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, setSortBy, setSortOrder } from '../redux/actions';

const BooksList = () => {
    const dispatch = useDispatch();
    const { books, loading, error, sortBy, sortOrder } = useSelector((state) => state);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    const handleSortByChange = (e) => {
        dispatch(setSortBy(e.target.value));
    };

    const handleSortOrderChange = (e) => {
        dispatch(setSortOrder(e.target.value));
    };

    // Derived state: sort the books array without mutating the original Redux state
    const safeBooks = Array.isArray(books) ? books : [];
    const sortedBooks = [...safeBooks].sort((a, b) => {
        // Fallbacks added in case a field is missing from the API response
        const valA = (a[sortBy] || '').toLowerCase();
        const valB = (b[sortBy] || '').toLowerCase();

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    return (
        <div className="books-list-container">
            <h1>Books List</h1>

            {error ? <p>Error fetching books: {error}</p> : null}
            
            <div className="sorting-container sorting-controls">
                <div>
                    <label htmlFor="sortBy">Sort by:</label>
                    <select id="sortBy" onChange={handleSortByChange} value={sortBy}>
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="publisher">Publisher</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="sortOrder">Order:</label>
                    <select id="sortOrder" onChange={handleSortOrderChange} value={sortOrder}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && sortedBooks.length === 0 ? (
                        <tr>
                            <td colSpan="4">Loading books...</td>
                        </tr>
                    ) : sortedBooks.length > 0 ? (
                        sortedBooks.map((book, index) => (
                            <tr key={book.primary_isbn13 || index}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publisher}</td>
                                {/* Checks for primary_isbn13, falls back to isbn if different API structure */}
                                <td>{book.primary_isbn13 || book.isbn || 'N/A'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No books found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BooksList;