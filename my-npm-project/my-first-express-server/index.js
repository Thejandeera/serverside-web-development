const express = require("express");//import the express module

const app = express();// initialize an express instance

app.get("/hello", (req, res) => { //define a route
    res.send("hello world"); //send the response
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
