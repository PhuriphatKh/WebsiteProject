const express = require('express')
const app = express()
const ejs = require('ejs')
const mysql = require('mysql2')
const expressSession = require('express-session')
const flash = require('connect-flash')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projectweb'
});

global.loggedIn = null

const homeController = require('./controllers/homeController')
const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const logoutController = require('./controllers/logoutController')
const signupController = require('./controllers/signupController')
const phaidangController = require('./controllers/phaidangController')
const reviewController = require('./controllers/reviewController')
const secondController = require('./controllers/secondController')
const profileController = require('./controllers/profileController')
const settingController = require('./controllers/settingController')

const redirifAuth = require('./middleware/redirifAuth')
const AuthMiddleware = require('./middleware/AuthMiddleware')

app.use(expressSession({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use("*", (req, res, next) => {
    loggedIn = req.session.MemberID
    next()
})
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.set('view engine', 'ejs')

app.listen(3000, () => {
    console.log("App listening on port 3000")
})

app.get('/',redirifAuth, indexController)
app.get('/home',AuthMiddleware, homeController)
app.get('/login',redirifAuth, loginController)
app.get('/signup',redirifAuth, signupController)
app.get('/logout', logoutController)
app.get('/phaidang', phaidangController)
app.get('/review', reviewController)
app.get('/second-1', secondController)
app.get('/second-2', secondController)
app.get('/second-3', secondController)
app.get('/second-4', secondController)
app.get('/second-5', secondController)
app.get('/second-6', secondController)
app.get('/second-7', secondController)
app.get('/second-8', secondController)
app.get('/second-9', secondController)
app.get('/second-10', secondController)
app.get('/second-11', secondController)
app.get('/profile', profileController)
app.get('/setting', settingController)

app.post('/login',redirifAuth, function(request, response) {
    var email = request.body.email;
    var password = request.body.password;
    if (email && password) {
        connection.query('SELECT * FROM members WHERE Email = ? AND Password_Member = ?', [email, password], function(error, results, fields) {
            if (results.length > 0) {
                request.session.MemberID = results[0].Id_Member
                response.redirect('/home')
            } else {
                response.redirect('/login')
            }
            response.end();
        });
    } else {
        response.redirect('/login')
        response.end();
    }
});

app.post('/signup',redirifAuth, function(request, response) {
    var email = request.body.email;
    var password = request.body.password;
    var firstname = request.body.firstname;
    var lastname = request.body.lastname;

    connection.query('SELECT * FROM members WHERE Email = ?', [email], function(error, results, fields) {
        if (results.length > 0) {
            response.redirect('/signup')
        } else {
            connection.query('INSERT INTO members (Email, Password_Member, Firstname, Lastname) VALUES (?, ?, ?, ?)', [email, password, firstname, lastname], function(error, results, fields) {
                if (error) {
                    response.redirect('/signup')
                } else {
                    response.redirect('/login')
                }
            });
        }
    });
});

app.post('/save', function(request, response) {
    var memberId = request.session.MemberID;
    var firstname = request.body.firstname;
    var lastname = request.body.lastname;

    if (memberId && firstname && lastname) {
        connection.query('UPDATE members SET Firstname = ?, Lastname = ? WHERE Id_Member = ?', [firstname, lastname, memberId], function(error, results, fields) {
            if (error) {
                response.redirect('/setting')
            } else {
                response.redirect('/home')
            }
        });
    } else {
        response.send('Please provide memberId, firstname, and lastname.');
    }
});

