// JSX for the login page

const helper = require('./helper.js');
const React = require('react');
const { createRoot } = require('react-dom/client');

const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;

    // make sure the fields aren't empty
    if (!username || !pass) {
        helper.handleError('Username or password is empty!');
        return false;
    };

    helper.sendPost(e.target.action, { username, pass });
    return false;
};

const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const firstname = e.target.querySelector('#firstname').value;
    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector("#pass").value;
    const pass2 = e.target.querySelector('#pass2').value;

    // make sure fields aren't empty
    if (!firstname || !username || !pass || !pass2) {
        helper.handleError("All fields are required!");
        return false;
    };

    // make sure the passwords are the same
    if (pass !== pass2) {
        helper.handleError("Passwords do not match!");
        return false;
    }

    helper.sendPost(e.target.action, {firstname, username, pass, pass2 });
    return false;
}

const LoginWindow = (props) => {
    return (
        <form id='loginForm'
            name='loginForm'
            onSubmit={handleLogin}
            action='/login'
            method='POST'
            className='mainForm'>

            <label htmlFor='username'> Username: </label>
            <input id='user' type='text' name='username' placeholder='username' />
            <label htmlFor="pass">Password:</label>
            <input id='pass' type="password" name='pass' placeholder='password' />
            <input className='formSubmit' type='submit' value="Sign In" />
        </form>
    );
};


// Signup window
const SignupWindow = (props) => {
    return (
        <form id='signupForm'
            name='signupForm'
            onSubmit={handleSignup}
            action='/signup'
            method='POST'
            className='mainForm'>

            <label htmlFor="firstname">First Name: </label>
            <input id='firstname' type='text' name='firstname' placeholder='first name' />
            <label htmlFor='username'> Username: </label>
            <input id='user' type='text' name='username' placeholder='username' />
            <label htmlFor='pass'>Password:</label>
            <input id='pass' type='password' name='pass' placeholder='password' />
            <label htmlFor='pass2'>Password:</label>
            <input id='pass2' type='password' name='pass2' placeholder='retype password' />
            <input className='formSubmit' type='submit' value='Sign Up' />
        </form>
    );
};

const init = () => {
    const loginButton = document.querySelector('#loginButton');
    const signupButton = document.querySelector('#signupButton');

    const root = createRoot(document.querySelector('#content'));

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render(<LoginWindow />);
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render(<SignupWindow />);
        return false;
    });

    root.render(<LoginWindow />);
};

window.onload = init;