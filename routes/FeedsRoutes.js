// Import express

const express = require('express');

// Invoke ONLY the router()

const router = express.Router();

// Import the FeedsModel

const FeedsModel = require('../models/FeedsModel');

// A POST route for saving data into the 'feeds' collection

router.post(
    '/likes',
    (req, res) => {

        // Read the 'Body' within POST request

        const formData = {
            text: req.body.text,
            username: req.body.username,
            likes: req.body.likes,
            hashtags: req.body.hashtags
        };

                // Save the data to database (feeds database)

                const newFeedModel = new FeedsModel(formData);
                newFeedModel.save();
        
                res.send('Your POST has been received!');
        
                }
            );

// A GET route for fetching data from the 'feeds' collection

        router.get(
            '/',
            (req, res) => {
                // (1) Fetch all the documents using .find()
                FeedsModel.find()
                // (2) Once the results are ready, use .json() to send the results
                .then(
                    (results) => {
                        // res.json = res.send() + converts two JSON format and sends automatically
                        res.json(results)
                    }
                )
                .catch(
                    (e) => {
                        console.log('error occured', e)
                    }
                );
                
            }
        );

module.exports = router;