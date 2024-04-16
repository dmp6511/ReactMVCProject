// jsx for the profile page:

const React = require('react');
const { createRoot } = require('react-dom/client');
const { useState, useEffect } = React;


// show the users profile
const App = () => {
    return (
        <div>
            <h1>Hello!</h1>
            <h2>Welcome to your profile page!</h2>

            {/* show users first name and user */}
            <h3>username</h3>

            <br />
            <h3>favorites:</h3>
            <ul>
                <li>favorite 1</li>
                <li>favorite 2</li>
                <li>favorite 3</li>
            </ul>
        </div>
    )
};

// init
const init = () => {
    root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init;