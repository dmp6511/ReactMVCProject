// jsx for the profile page:

const React = require('react');
const { createRoot } = require('react-dom/client');
const { useState, useEffect } = React;


// show the users profile
const App = (props) => {

    // get the username from the server


    return (
        <div>
            <h1>Hello! </h1>
            <h2>Welcome to your profile page!</h2>

            <section id='profilePhoto'>
                <p>Here you can set a profile photo to your liking! </p>
                <button id='setProfilePhoto' name='setProfilePhoto'>Set Profile Photo</button>
            </section>

            <section id='favorites'>
                <div>
                    <p>Here you will be able to view the songs that you have favorited. </p>
                </div>
                <ul>Favorites: </ul>
            </section>

            {/* profit model */}
            <section>
                <h3>Upgrade?</h3>
                <p>Here you can opt in for the premium version of the application. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat reprehenderit veritatis eligendi possimus nesciunt eius praesentium unde voluptate iusto laborum minus architecto dolorem, sint optio et libero, eaque nulla. Esse.</p>
                <button id='upgradeBtn'>Upgrade Now! </button>
            </section>

            <section id='changePassword'>
                <div>
                    <h3> <b>Change Password? </b> </h3>
                    <button id='changePassBtn' name='changePassBtn'>Change Password</button>
                </div>
            </section>



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