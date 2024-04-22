// jsx for the profile page:

const React = require('react');
const { createRoot } = require('react-dom/client');
const { useState, useEffect } = React;


// show the users profile
const App = (props) => {

    // get the username from the server
    const [username, setUsername] = React.useState(props.username);


    return (
        <div>
            <h1>Hello! </h1>
            <h2>Welcome to your profile page!</h2>

            <p>Here you will be able to view the songs that you have favorited. </p>

            <ul>
                <li>song 1 - artist 1 </li>
                <li>song 2 - artist 2</li>
            </ul>

            <br />
        </div>
    )
};

// init
const init = () => {
    root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init;