// maker JSX

const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const handleDomo = (e, onDomoAdded) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    const age = e.target.querySelector('#domoAge').value;
    const height = e.target.querySelector('#domoHeight').value;
    const weight = e.target.querySelector('#domoWeight').value;

    // make sure the fields aren't empty
    if (!name || !age || !height || !weight) {
        helper.handleError('All fields are required!');
        return false;
    };

    helper.sendPost(e.target.action, { name, age, height, weight }, onDomoAdded);
    return false;
};

// domo form
const DomoForm = (props) => {
    return (
        <form id='domoForm'
            onSubmit={(e) => handleDomo(e, props.triggerReload)}
            name='domoForm'
            action='/maker'
            method='POST'
            className='domoForm'
        >
            <label htmlFor='name'>Name: </label>
            <input id='domoName' type='text' name='name' placeholder='Domo Name' />
            <label htmlFor='age'>Age: </label>
            <input id='domoAge' type='number' min='0' name='age' />

            {/* spacing */}
            <br />

            <div>
                {/* add height and weight fields */}
                <label htmlFor='height'>Height: </label>
                <input id='domoHeight' type='text' name='height' placeholder="5'10" />
            </div>

            <div>
                <label htmlFor='weight'>Weight: </label>
                <input id='domoWeight' type='number' min='0' name='weight' />
            </div>
            <br />

            <input className='makeDomoSubmit' type='submit' value='Make Domo' />
        </form>
    );
};

// domo list
const DomoList = (props) => {
    const [domos, setDomos] = useState(props.domos);

    useEffect(() => {
        const loadDomosFromServer = async () => {
            const response = await fetch('/getDomos');
            const data = await response.json();
            setDomos(data.domos);
        };

        loadDomosFromServer();
    }, [props.reloadDomos]);

    if (domos.length === 0) {
        return (
            <div className='domoList'>
                <h3 className='emptyDomo'>No Domos yet</h3>
            </div>
        );
    }

    const domoNodes = domos.map((domo) => {
        return (
            <div key={domo._id} className='domo'>
                <img src='/assets/img/domoface.jpeg' alt='domo face' className='domoFace' />
                <h3 className='domoName'>Name: {domo.name}</h3>
                <h3 className='domoAge'>Age: {domo.age}</h3>

                {/* add height and weight */}
                <h3 className='domoHeight'>Height: {domo.height}</h3>
                <h3 className='domoWeight'>Weight: {domo.weight}</h3>
            </div>
        );
    });

    // return the domo list
    return (
        <div className='domoList'>
            {domoNodes}
        </div>
    );
};

const App = () => {
    const [reloadDomos, setReloadDomos] = useState(false);

    return (
        <div>
            <div id='makeDomo'>
                <DomoForm triggerReload={() => setReloadDomos(!reloadDomos)} />
            </div>
            <div id='domos'>
                <DomoList domos={[]} reloadDomos={reloadDomos} />
            </div>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init;