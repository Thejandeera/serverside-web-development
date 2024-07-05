var fs = require("fs");

fs.readFile("external.txt",function(err,data){
    if(err) return console.log(err);

    console.log(data.toString());
});

console.log("Another node.js line after file read");
