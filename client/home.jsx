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
            <h1>Welcome to the homepage </h1>
            <h2>Here you can view the latest blogs from our users </h2>

            <section id='blogs'>
                <h3>Latest Blogs </h3>
            </section>
        </div>
    )
};

// render the home page
const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<Home />);
};

window.onload = init;