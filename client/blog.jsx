// jsx for blogs

const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

// handle blog creation
const handleBlog = (e, onBlogAdded) => {
    e.preventDefault();
    helper.hideError();

    const title = e.target.querySelector('#title').value;
    const artist = e.target.querySelector('#artist').value;
    const genre = e.target.querySelector('#genre').value;
    const rating = e.target.querySelector('#rating').value;
    const description = e.target.querySelector('#description').value; // descriptiosn are not required

    // make sure the fields aren't empty
    if (!title || !artist || !genre || !rating) {
        helper.handleError('Some fields are empty!');
        return false;
    };

    // make sure the rating is a number
    if (Number.isNaN(rating)) {
        helper.handleError('Rating must be a number!');
        return false;
    };

    // make sure the rating is between 0 and 5
    if (rating < 0 || rating > 5) {
        helper.handleError('Rating must be between 0 and 5!');
        return false;
    };

    // post request
    helper.sendPost(e.target.action, { title, artist, genre, rating, description }, onBlogAdded);
    return false;
};


// blog form
const BlogForm = (props) => {
    return (
        <div>
            <form id="blogForm"
                name="blogForm"
                onSubmit={(e) => handleBlog(e, props.refreshBlogs)}
                action="/blog"
                method='POST'
                className='blogForm'
            >
                <label htmlFor="title">Title: </label>
                <input id="title" type="text" name="title" placeholder="Song Title" />
                <label htmlFor="artist">Artist: </label>
                <input id="artist" type="text" name="artist" placeholder="Artist" />
                <label htmlFor="genre">Genre: </label>
                <input id="genre" type="text" name="genre" placeholder="Genre" />
                <label htmlFor="rating">Rating: </label>
                <input type="number" name="rating" id="rating" max={5} placeholder='Rate out of 5' />
                <label htmlFor="description">Description: </label>
                <input id="description" type="textarea" name="description" placeholder="Leave some thoughts!" />
                <input className='makeBlogSubmit' type='submit' value='Submit Blog' />

            </form>
        </div>
    );
};

// blog list
const BlogList = (props) => {
    const [blogs, setBlogs] = useState(props.blogs);

    // call in the blogs
    useEffect(() => {
        const loadBlogsfromServer = async () => {
            const res = await fetch('/getBlogs');
            const data = await res.json();
            setBlogs(data.blogs);
        };

        loadBlogsfromServer();
    }, [props.refreshBlogs]);

    // if the list is empty
    if (blogs.length === 0) {
        return (
            <div className='blogList'>
                <h3 className='emptyBlog'>No Blogs yet</h3>
            </div>
        );
    }

    // if the list is not empty
    const blogNodes = blogs.map((blog) => {
        return (

            // blog card
            <div key={blog._id} className='blog'>
                <section id='blogCard'>

                    {/* show the username and date of the blog */}
                    {/* <h3 className="blogUsername">User: {blog.username} </h3> */}


                    <h3 className='blogTitle'> '{blog.title}' by {blog.artist} </h3>
                    <h4 className='blogRating'> {blog.rating} &#9733; of 5 &#9733; </h4>
                    <h4 className='blogGenre'> Genre: {blog.genre} </h4>

                    {/* if there is a description */}
                    <h4 className="blogTakes"> Takeaways: </h4>
                    <p className='blogDescription'>{blog.description}</p>

                    {/* created at */}
                    <h5 className='blogDate'> Created at: {new Date(blog.createdAt).toLocaleString()} </h5>
                    <h5 className="blogOwner">Owner ID: {blog.owner}</h5>
                </section>
            </div>
        );
    });

    return (
        <div className='blogList'>
            {blogNodes.reverse()}
        </div>
    );
};


// view for the blog page
const App = () => {
    const [refreshBlogs, setRefreshBlogs] = useState(false);

    return (

        <div>
            <h1>Blog Page</h1>
            <h2> Create your blogs here! </h2>


            <div id='createBlog'>
                <h3>Make a Blog</h3>
                <BlogForm triggerReload={() => setRefreshBlogs(!refreshBlogs)} />
            </div>

            <div id='blogs'>
                <h3> Your Most Recent Blogs </h3>
                <BlogList blogs={[]} refreshBlogs={refreshBlogs} />
            </div>
        </div>
    );
};

// init
const init = () => {

    const root = createRoot(document.getElementById('app'));

    root.render(<App />);
};

window.onload = init;