const express = require("express");//import the express module

const app = express();// initialize an express instance

app.get("/a/cool/route/path",function(req,res){
    res.send("This is /a/cool/route/path")
    console.log("The user visited /a/cool/route/path")

})


app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
