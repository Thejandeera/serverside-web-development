var express = require("express");
var app = express();

var HTTP_PORT = 8000;

app.listen(HTTP_PORT,()=>{
    console.log("Server running on %PORT% ".replace("%PORT%",HTTP_PORT));
});

app.get('/',(req,res)=>{
    res.send("Getting Some Date");
})
app.post('/',(req,res)=>{
    res.send("post Some Date");
})
app.put('/',(req,res)=>{
    res.send("put Some Date");
})
app.delete('/',(req,res)=>{
    res.send("delete Some Date");
})