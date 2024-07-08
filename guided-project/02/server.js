var express = require('express');
var app = express();
var db = require("./database.js");
var bodyParser = require("body-parser");
const { request, response } = require("express");

app.use(bodyParser.json());

let HTTP_PORT = 8080;

app.listen(HTTP_PORT, () => {
    console.log("Server is running on %PORT%".replace("%PORT%", HTTP_PORT));
});

app.post("/api/products", (req, res, next) => {
    try {
        var errors = [];
        if (!req.body) {
            errors.push("No input data provided");
        }
        const {
            productName,
            description,
            category,
            brand,
            expireDate,
            manufactureDate,
            batchNumber,
            unitPrice,
            quantity,
            createDate
        } = req.body;

        if (!productName || !description || !category || !brand || !expireDate || !manufactureDate || !batchNumber || !unitPrice || !quantity || !createDate) {
            errors.push("Missing required fields");
        }

        if (errors.length > 0) {
            res.status(400).json({ "error": errors.join(", ") });
            return;
        }

        var sql = 'INSERT INTO products (productName, description, category, brand, expireDate, manufactureDate, batchNumber, unitPrice, quantity, createDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        var params = [productName, description, category, brand, expireDate, manufactureDate, batchNumber, unitPrice, quantity, createDate];
        
        db.run(sql, params, function (err, result) {
            if (err) {
                console.error(err.message); 
                res.status(400).json({ "error": err.message });
                return;
            } else {
                res.json({
                    "message": "success",
                    "data": req.body,
                    "id": this.lastID,
                    "message2":"Nice Thejan ..😙"
                });
            }
        });
    } catch (E) {
        console.error(E);  
        res.status(400).send(E.message);
    }
});

app.get("/api/products",(req,res)=>{
    try{
    var sql="select * from products"
    var params =[]
    db.all(sql,params,(err,rows)=>{
        if(err){
            res.status(400).json({"error":err.message})
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
}catch(E){
    res.status(400).send(E);
}
})

app.put("/api/products/", (req, res, next) => {
    const {
        id,
        productName,
        description,
        category,
        brand,
        expireDate,
        manufactureDate,
        batchNumber,
        unitPrice,
        quantity,
        createDate
    } = req.body;

    // Validate required fields
    if (!id || !productName || !description || !category || !brand || !expireDate || !manufactureDate || !batchNumber || !unitPrice || !quantity || !createDate) {
        res.status(400).json({ "error": "Missing required fields" });
        return;
    }

    db.run('UPDATE products SET productName = ?, description = ?, category = ?, brand = ?, expireDate = ?, manufactureDate = ?, batchNumber = ?, unitPrice = ?, quantity = ?, createDate = ? WHERE id = ?',
        [productName, description, category, brand, expireDate, manufactureDate, batchNumber, unitPrice, quantity, createDate, id],
        function (err, result) {
            if (err) {
                console.error(err.message); // Log the error
                res.status(400).json({ "error": err.message });
                return;
            }
            if (this.changes === 0) {
                res.status(404).json({ "error": "Product not found" });
                return;
            }
            res.status(200).json({ "message": "Updated", "updated": this.changes });
        }
    );
});

app.delete("/api/products/delete/:id",(req,res)=>{
    try{
        db.run('DELETE FROM products WHERE id = ?',
            req.params.id,
            function(err,result){
                if(err){
                    res.status(400).json({"error":res.message})
                    return;
                }
                res.json({"message":"deleted",
                    rows:this.changes});
            }
        )
    }catch(E){
        res.status(400).send(E)
    }
});


module.exports = app;
