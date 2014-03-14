module.exports.controller = function(app) {

  /**
   * a home page route
   */
   app.get('/', function(req, res) {

    res.render('index/index',{ pageTitle: 'Home page' });

  });

   /**
    * a signup page route
    */
    app.get('/signup', function(req, res) {
        // any logic goes here
        res.render('index/index');
      });

  /**
   * About page route
   */
   app.get('/login', function(req, res) {
        // any logic goes here
        res.render('index/login');
      });

};
