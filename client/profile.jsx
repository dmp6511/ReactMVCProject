// jsx for the profile page:

const React = require('react');
const helper = require('./helper.js');
const { createRoot } = require('react-dom/client');
const { useState, useEffect } = React;

// change the users password
const handleChangePass = (e) => {
    e.preventDefault();
    helper.hideError();

    // get the users current password and the new password
    const currentPass = e.target.querySelector('#currentPass').value;
    const newPass = e.target.querySelector('#newPass').value;
    const newPass2 = e.target.querySelector('#newPass2').value;

    // make sure the fields aren't empty
    if (!currentPass || !newPass || !newPass2) {
        helper.handleError('Some fields are empty!');
        return false;
    };

    // make sure the new passwords match
    if (newPass !== newPass2) {
        helper.handleError('New passwords do not match!');
        return false;
    };

    // apply the changes to the user
    helper.sendPost(e.target.action, { currentPass, newPass, newPass2 });
    return false;
};

// changePass window
const ChangePassWindow = (props) => {
    return (
        <div>
            <h1>Change Password</h1>
            <h2>Here you can change your password</h2>

            <form id='changePassForm'
                name='changePassForm'
                onSubmit={handleChangePass}
                action='/changePass'
                method='POST'
                className='mainForm'
            >
                <label htmlFor='currentPass'>Current Password: </label>
                <input id='currentPass' type='password' name='currentPass' placeholder='Current Password' />
                <label htmlFor='newPass'>New Password: </label>
                <input id='newPass' type='password' name='newPass' placeholder='New Password' />
                <label htmlFor='newPass2'>Confirm New Password: </label>
                <input id='newPass2' type='password' name='newPass2' placeholder='Confirm New Password' />

                <input name='confirmSubmit' type="submit" value="Confirm Change" />
            </form>
        </div>
    )
};

// upgrade the user to premium

// show the users profile
const App = (props) => {

    // get the users first name
    const [firstname, setFirstname] = useState('User');


    // get the users favorites
    const [favorites, setFavorites] = useState([]);

    return (
        <div>
            <h1>Welcome {firstname}!</h1>
            <h2>Welcome to your profile page!</h2>


            {/* profile photo */}
            <section id='profilePhoto'>
                <p>Here you can set a profile photo to your liking! </p>
                <img src='../../assets/img/default.png' alt='profile photo' id='profilePic' />
                <button id='setProfilePhoto' name='setProfilePhoto'>Set Profile Photo</button>
            </section>


            {/* favorites */}
            <section id='favorites'>
                <h3>Favorite Songs</h3>
                <div id='songList'>
                    <p>Here you will be able to view the songs that you have favorited. </p>
                    <ul>Songs:

                    </ul>
                </div>
            </section>

            {/* profit model */}
            <section id='profitModel'>
                <h3>Upgrade?</h3>
                <p>Here you can opt in for the premium version of the application. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat reprehenderit veritatis eligendi possimus nesciunt eius praesentium unde voluptate iusto laborum minus architecto dolorem, sint optio et libero, eaque nulla. Esse.</p>
                <button id='upgradeBtn'>Upgrade Now! </button>
            </section>

            {/* change password */}
            <section id='changePassword'>
                <div>
                    <h3> <b>Change Password? </b> </h3>
                    <input id="changePassBtn" type="button" onClick={(e) => { props.root.render(<ChangePassWindow />) }} value="Change Password" />
                </div>
            </section>



            <br />
        </div>
    )
};

// init
const init = () => {

    const root = createRoot(document.getElementById('app'));

    // render the profile page
    root.render(<App root={root} />);
};

window.onload = init;