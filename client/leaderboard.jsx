// jsx for the leaderboard page

// leaderboard will display all users in the database based on their domo count

const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const App = (props) => {
    return (
        <div>
            <h1>Leaderboard</h1>
            <h2>Here are the users with the most Domos</h2>

            <div id='leaderboard'>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Domos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* leaderboard will go here */}
                        {/* get users names and domo counts */}
                        {/* loop through the users and display their names and domo counts */}
                        <tr>
                            <td>username</td>
                            <td>domo count</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// init
const init = () => {
    root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init;