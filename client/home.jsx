// jsx for the home page

/// call in react and helper functions
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');
const helper = require('./helper.js');



// show the home page
const Home = (props) => {

    // get the latest blogs and 
    const [blogs, setBlogs] = useState(props.blogs);

    useEffect(() => {
        const getBlogsFromServer = async () => {
            const response = await fetch('/getAllBlogs');
            const body = await response.json();
            console.log(body);
            setBlogs(body.blogs);
        };

        getBlogsFromServer();
    }, []);

    // if blogs are empty, show a message
    if (blogs.length === 0) {
        return (
            <div>
                <h1>Welcome to the homepage </h1>
                <h2>Here you can view the latest blogs from our users </h2>

                <div id='blogList'>
                    <h3 className='emptyBlog'>No Blogs yet</h3>
                </div>
            </div>
        )
    }

    // map the blogs to a list
    const blogList = blogs.map((blog) => {

        return (
            // blog card
            <div key={blog._id} className='blog'>
                <section id='blogCard'>

                    {/* favorite button */}
                    {/* sends the object to the favorites section on the profile page */}
                    <button className='favoriteButton' onClick={() => null}> &#10084; </button>

                    {/* show the username and date of the blog */}
                    <h5 className="blogOwner">Owner ID: {blog.owner}</h5>


                    <h3 className='blogTitle'> '{blog.title}' by {blog.artist} </h3>
                    <h4 className='blogGenre'> Genre: {blog.genre} </h4>
                    <h3 className='blogRating'> {blog.rating} &#9733; of 5 &#9733; </h3>

                    {/* if there is a description */}
                    <h3 className="blogTakes"> Takeaways: </h3>
                    <p className='blogDescription'>{blog.description}</p>

                    {/* created at */}
                    <h5 className='blogDate'> Created at: {new Date(blog.createdAt).toLocaleString()} </h5>
                </section>

                <br />
            </div>
        );
    });

    return (
        <div>
            <h1>Welcome to the homepage </h1>
            <h2>Here you can view the latest blogs from our users </h2>

            <section id='blogs'>
                <h3>Latest Blogs </h3>

                {/* show blog in reverse order */}
                <div id='blogList'>
                    {blogList.reverse()}
                </div>
            </section>
        </div>
    )
};

// render the home page
const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<Home blogs={[]} />);
};

window.onload = init;