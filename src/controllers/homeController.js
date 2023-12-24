let getHomePage = (req, res) => {
  return res.render("homepage.ejs");
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};
let getExamplePage = (req, res) => {
  return res.render("example/example.ejs");
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getExamplePage: getExamplePage,
};
