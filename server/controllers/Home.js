// HOME controller

// render the home page
const homePage = (req, res) => res.render('home');

// on the home page, users can see the latest blogs from users around the world

module.exports = {
    homePage,
};
