var fs = require('fs');

fs.readFile('nodse.txt',function(err,result){
    if(err) return console.error(err);
    console.log(result.toString());
});

console.log("Callback complete");