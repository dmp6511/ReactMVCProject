// jsx for the home page

/// call in react and helper functions
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');
const helper = require('./helper.js');

// show the home page
const Home = () => {
    return (
        <div>
            <h1>Welcome to the home page</h1>
            <p>Here you can find the latest blogs from users around the world! </p>
        </div>
    );
};

// render the home page
const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<Home />);
};

window.onload = init;