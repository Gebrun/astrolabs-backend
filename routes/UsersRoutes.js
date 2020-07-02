const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = "s3cr3t100";
const UsersModel = require('../models/UsersModel');

// /register
router.post(
    '/register',     // http://localhost:8080/users/register
    (req, res) => {
        const formData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        };




        // Step 1) Generate the salt (random data)
        // Step 2) With the salt and user's password, generate the ecrypted password
        // Step 3) Reassign formData.password to the ecrypted password
        // Step 4) Save the user's data


        // Step 1) Generate a salt
        bcrypt.genSalt(
            (err, salt) => {

                // Step 2) Generate a hash
                bcrypt.hash(
                    formData.password, // first ingredient
                    salt, // second ingredient
                    (err, hashedPassword) => {

                        const newUsersModel = new UsersModel(formData);

                        // Step 3) Replace the original password with hash
                        newUsersModel.password = hashedPassword;

                        // Step 4) Save user data to database (with encrypted password)
                        newUsersModel.save(
                            (err, dbResult) => {

                                // If something goes wrong, send error
                                if(err) {
                                    res.send(err);
                                }
                                // Otherwise, send success message
                                else {
                                    res.send("User has been saved")
                                }
                            }
                        );
                        
                    }
                )
            }
        );



        

        
    }
);

// /login

router.post(
    '/login',
    (req, res) => {

        // npm packages: passportjs, passportjwt, jsonwebtoken

        // Step 1) Capture the formData (email and password)

        const formData = {
            email: req.body.email,
            password: req.body.password
        }
        // Step 2a) In the database, find account that matches email

        UsersModel.findOne(
            {email: formData.email},
            (err, document) => {

                if(!document) {
                    res.send("Please check email or password");
                } 

                else {
                   
        // Step 4) Compare the encrypted password in database with incoming password

                    bcrypt.compare(formData.password, document.password)
                    .then(
                        (isMatch) => {

                            if(isMatch === true) {

                                const payload = { 
                                    id: document.id,
                                    email: document.email
                                }
                                    jwt.sign(
                                        payload,
                                        secret,
                                        (err, jsonwebtoken) => {
                                            res.send(
                                                {
                                                    msg: 'Login successful',
                                                    jsonwebtoken: jsonwebtoken
                                                }
                                            )
                                        }
                                    )
                            }   else {
                                    res.send("Please check email or password")
                            }
                        }
                    )
                }

                }
            )

            // Step 2b) If email DOES NOT match, reject the login request
        // Step 3) If there's matching email, examine the document's password
        // Step 5a) If the password matches, generate a web token (JWT)
            // Step 5b) If the password DOES NOT match, reject the login request
        // Step 6) Send the JWT to the client
    }
)

module.exports = router;