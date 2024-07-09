var express = require('express');
var app = express();
var db = require("./database.js");
var bodyParser = require("body-parser");
const { request, response } = require("express");

app.use(bodyParser.json());

let HTTP_PORT = 8080;

app.listen(HTTP_PORT, () => {
    console.log(`Server is running on ${HTTP_PORT}`);
});

app.post("/api/customer", (req, res, next) => {
    try {
        var errors = [];
        if (!req.body) {
            errors.push("No input data provided");
        }
        const {
            name,
            address,
            email,
            dateOfBirth,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expireDate,
            cvv,
            timeStamp
        } = req.body;

        if (!name || !address || !email || !dateOfBirth || !gender || !age || !cardHolderName || !cardNumber || !expireDate || !cvv || !timeStamp) {
            errors.push("Missing required fields");
        }

       
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push("Invalid email format");
        }

        
        if (cardNumber.length < 12 ) {
            errors.push("Invalid credit card number. It must be exactly 12 digits.");
        }

        if (errors.length > 0) {
            res.status(400).json({ "error": errors.join(", ") });
            return;
        }

        var sql = 'INSERT INTO customer (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expireDate, cvv, timeStamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        var params = [name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expireDate, cvv, timeStamp];
        
        db.run(sql, params, function (err, result) {
            if (err) {
                console.error(err.message); 
                res.status(400).json({ "error": err.message });
                return;
            } else {
                res.json({
                    "message": `Customer ${name} has registered`,
                    "customerId": this.lastID
                });
            }
        });
    } catch (E) {
        console.error(E);  
        res.status(400).send(E.message);
    }
});

module.exports = app;
