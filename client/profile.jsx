// jsx for the profile page:

const React = require('react');
import { toast } from 'react-toastify';
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
    helper.sendPost(e.target.action, { currentPass, newPass, newPass2 }).then((result) => {
        if (result.message) {
            toast(result.message);
        }
    });
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


// handle favorites for the user
const handleFavorite = (e) => {
    e.preventDefault();
    helper.hideError();

    // get the blog object
    const blog = e.target.querySelector('#blogCard');

    // post request
    helper.sendPost(e.target.action, blog);
    return false;
};

// favorites list
const FavoritesList = (props) => {
    const [favorites, setFavorites] = useState(props.favorites);

    // call in the favorites
    useEffect(() => {
        const loadFavoritesfromServer = async () => {
            const response = await fetch('/getFavorites');
            const body = await response.json();
            console.log(body);
            setFavorites(body.favorites);
        };

        loadFavoritesfromServer();
    }, [props.refreshFavorites]);

    // if the list is empty
    if (favorites.length === 0) {
        return (
            <div>
                <h3 className='emptyBlog'>No Favorites yet</h3>
            </div>
        )
    }

    // map the favorites to a list
    const favoriteList = favorites.map((favorite) => {
        return (
            <div key={favorite._id} className='blog'>
                <h3>{favorite.title}</h3>
                <h4>{favorite.artist}</h4>
                <h4>{favorite.genre}</h4>
                <h4>{favorite.rating}</h4>
                <p>{favorite.description}</p>
            </div>
        );
    });

    return (
        <div id='favsList'>
            {favoriteList}
        </div>
    );
};

// favorite window
const FavoriteWindow = (props) => {

    // refresh the favorites
    const [refreshFavorites, setRefreshFavorites] = useState(false);

    return (
        <div>
            <h1>Favorite Songs</h1>
            <h2>Here you can view the songs that you have favorited. </h2>

            <div id='favsList'>
                <FavoritesList favorites={[]} refreshFavorites={refreshFavorites} />
            </div>
        </div>
    )
};

// upgrade the user to premium
const handleUpgrade = (e) => {
    e.preventDefault();
    helper.hideError();

    // get the card information from the user
    const cardName = e.target.querySelector('#cardName').value;
    const cardNumber = e.target.querySelector('#cardNumber').value;
    const cardExp = e.target.querySelector('#cardExp').value;
    const cardCVV = e.target.querySelector('#cardCVV').value;

    // make sure the fields aren't empty
    if (!cardName || !cardNumber || !cardExp || !cardCVV) {
        helper.handleError('All fields are required!');
        return false;
    };

    // make sure the card number is valid
    if (cardNumber.length !== 16) {
        helper.handleError('Invalid card number! Card number must be 16 digits long!');
        return false;
    };

    // make sure the cvv is valid
    if (cardCVV.length !== 3) {
        helper.handleError('Invalid CVV! CVV must be 3 digits long');
        return false;
    };

    // send the user to the upgrade page
    helper.sendPost(e.target.action, { cardName, cardNumber, cardExp, cardCVV }).then((result) => {
        if (result.message) {
            toast(result.message);
        }
    });
    return false;
};

// upgrade window
const UpgradeWindow = (props) => {
    return (
        <div>
            <h1>Upgrade to Premium</h1>
            <h2>Please do <b>NOT</b> provide any actual financial information </h2>

            <p>Here you can upgrade to the premium version of the application. For only a small cost of "Free 99" </p>
            <form id='upgradeForm'
                name='upgradeForm'
                onSubmit={handleUpgrade}
                action='/upgrade'
                method='POST'
                className='mainForm'
            >
                {/* accept card information */}
                <label htmlFor='cardName'>Card Name: </label>
                <input id='cardName' type='text' name='cardName' placeholder='Cardholder Name' />
                <label htmlFor='cardNumber'>Card Number: </label>
                <input id='cardNumber' type='text' name='cardNumber' placeholder='Card Number (Ex: 1234-4567-7890-1234)' />
                <label htmlFor='cardExp'>Card Expiration: </label>
                <input id='cardExp' type='text' name='cardExp' placeholder='Card Expiration (Ex: MM/YYYY)' />
                <label htmlFor='cardCVV'>Card CVV: </label>
                <input id='cardCVV' type='text' name='cardCVV' placeholder='Card CVV (Ex: 123)' />

                <input name='upgradeSubmit' type="submit" value="Upgrade Now" />
            </form>
        </div>
    )
};



// profile photo handle function
const handleProfilePhoto = (e) => {
    e.preventDefault();
    helper.hideError();

    // get the users photo
    const photo = e.target.querySelector('#profilePic').files[0];

    // make sure the photo isn't empty
    if (!photo) {
        helper.handleError('No photo selected!');
        return false;
    };

    // get new form data
    const formData = new FormData();
    formData.append('photo', photo);

    console.log("form data", formData);


    // update the users photo
    helper.sendPost(e.target.action, formData).then((result) => {
        if (result.message) {
            toast(result.message);
        }
    });
    return false;
};

// profile photo window
const ProfilePhotoWindow = (props) => {
    return (
        <div>
            <h1>Profile Photo</h1>
            <h2>Here you can set a profile photo to your liking!</h2>

            <form id='profilePhotoForm'
                name='profilePhotoForm'
                onSubmit={handleProfilePhoto}
                action='/upload'
                method='POST'
                className='mainForm'
            >
                <label htmlFor='profilePic'>Profile Photo: </label>
                <input id='profilePic' type='file' name='profilePic' />
                <input name='profilePicBtn' type="submit" value="Set Profile Photo" />
            </form>
        </div>
    )
};



// show the users profile
const App = (props) => {


    // get the users first name
    const [firstname, setFirstname] = useState(false);
    useEffect(() => {
        const getFirstname = async () => {
            const response = await fetch('/getProfile');
            const body = await response.json();
            console.log("body for getFirstname", body);
            setFirstname(body.account.firstname);
        };
        getFirstname();
    }, [props.firstname]);

    return (
        <div>
            <h1>Hello {firstname}!</h1>
            <h2>Welcome to your Profile Page!</h2>


            {/* profile photo */}
            <section id='profilePhotoSect'>
                <img src='../../assets/img/blank.png' alt='profile photo' id='profilePic' />
                <input id='profilePicBtn' name='profilePicBtn' onClick={(e) => { props.root.render(<ProfilePhotoWindow />) }} type="button" value="Set Profile Photo" />
            </section>


            {/* favorites */}
            <section id='favorites'>
                <h3>Favorite Songs</h3>
                <div>
                    <p>Here you can view the songs that you have favorited. </p>
                    <input id='favoritesBtn' type="button" onClick={(e) => { props.root.render(<FavoriteWindow />) }} value="View Favorites" />
                </div>
            </section >

            {/* profit model */}
            < section id='profitModel' >
                <h3>Upgrade?</h3>
                <p>Here you can opt in for the premium version of the application. This will provide you will exclusive features in the app and a profile badge. </p>
                <input id='upgradeBtn' type="button" onClick={(e) => { props.root.render(<UpgradeWindow />) }} value="Upgrade Now!" />
            </section >

            {/* change password */}
            < section id='changePassword' >
                <div>
                    <h3> <b>Change Password? </b> </h3>
                    <input id="changePassBtn" type="button" onClick={(e) => { props.root.render(<ChangePassWindow />) }} value="Change Password" />
                </div>
            </section >
            <br />
        </div >
    );
};

// init
const init = () => {

    const root = createRoot(document.getElementById('app'));

    // render the profile page
    root.render(<App root={root} />);
};

window.onload = init;