import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import BooksList from './BooksList';
import "../styles/App.css" // Add basic styling here for responsiveness if needed

const App = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <BooksList />
            </div>
        </Provider>
    );
};

export default App;