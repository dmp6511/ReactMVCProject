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
                <h2>There are no blogs to display </h2>
            </div>
        )
    }

    // map the blogs to a list
    const blogList = blogs.map((blog) => {

        return (
            // blog card
            <div key={blog._id} className='blog'>
                <section id='blogCard'>

                    {/* show the username and date of the blog */}
                    <h2 className="blogOwner">{blog.owner}</h2>


                    <h3 className='blogTitle'> '{blog.title}' by {blog.artist} </h3>
                    <h4 className='blogGenre'> Genre: {blog.genre} </h4>
                    <h4 className='blogRating'> {blog.rating} &#9733; of 5 &#9733; </h4>

                    {/* if there is a description */}
                    <h4 className="blogTakes"> Takeaways: </h4>
                    <p className='blogDescription'>{blog.description}</p>
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
                <div className='blogList'>
                    {blogList}
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