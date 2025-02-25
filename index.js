const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//want to put changes
const mongoURL = 'mongodb://localhost:27017';
const dbName = 'Restaurant_website';

MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    console.log('Connected to MongoDB');
    

    const db = client.db(Restaurant_website);
    const ordersCollection = db.collection('orders');

    app.post('/submit-order', (req, res) => {
        const { name, phoneNumber, order, address } = req.body;

        // Insert order into MongoDB
        ordersCollection.insertOne({ name, phoneNumber, order, address }, (err, result) => {
            if (err) {
                console.error('Error inserting order:', err);
                res.status(500).send('Error submitting order');
            } else {
                console.log('Order submitted successfully');
                res.status(200).send('Order submitted successfully');
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

