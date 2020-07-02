// Importing the express module inside your server

const express = require('express');

// Import mongoose inside server

const mongoose = require('mongoose');

// Import body-parser

const bodyParser = require('body-parser');

// Import passport

const passport = require('passport');

// Import strategies

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secret = "s3cr3t100";

const UsersModel = require('./models/UsersModel');

const passportJwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}

const passportJwt = (passport) => {
    passport.use(
        new JwtStrategy(
            passportJwtOptions,
            (jwtPayload, done) => {
                // Extracts and finds the user by their id (contained jwt)
                UsersModel.findOne({_id: jwtPayload.id})
                .then(
                    // If the document was found
                    (document) => {
                        return done(null, document)
                    }
                )
                .catch(
                    // If something went wrong with database
                    (err) => {
                        return done(null, null);
                    }
                )
            }
        )
    )
}

// Import routes

const ProductsRoutes = require('./routes/ProductsRoutes');
const FeedsRoutes = require('./routes/FeedsRoutes');
const UsersRoutes = require('./routes/UsersRoutes');

// Create the server object

const server = express();

// Configure express to use body-parser

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(passport.initialize());
passportJwt(passport);

// server.use(express.json());

const dbURL = "mongodb+srv://Admin01:1stCopyright@cluster0-bdhvw.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(
    dbURL,
    {
        'useNewUrlParser': true,
        'useUnifiedTopology': true
    }
).then(
    ()=>{
        console.log('You are connected to MongoDB!');
    }
).catch(
    (e)=>{
        console.log('You are connected!');
    }
);

// When products is requested, the server executes the product routes

server.use(
    '/products',
    ProductsRoutes
);

// Feeds Model

server.use(
    '/feeds',
    passport.authenticate('jwt', {session:false}),
    FeedsRoutes
);

server.use(
    '/users',
    UsersRoutes
);



// Create a route for the landing page

server.get(
    '/',
    (req, res) => {
        res.send("<h1>Welcome to somewebsite.com</h1>")
    }
);

server.get(
    '/about',
    (req, res) => {
        res.send("<h1>About</h1>")
    }
);

server.get(
    '/contact',
    (req, res) => {
        res.send("<h1>Welcome to Contact Center</h1>")
    }
);

server.get(
    '/product',
    (req, res) => {
        res.send("<h1>Price is 250 AED</h1>")
    }
);


server.get(
    '/*',
    (req, res) => {
        res.send("<h1>404 NOT FOUND</h1>")
    }
);


// Connect to port (range 3000 - 9999)
// http://127.0.0.1:8080 (aka http://localhost:8080)

server.listen(
    8080, ()=>{
        console.log('You are connectedd!');
    }
)