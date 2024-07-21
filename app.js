const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

app.use(cookieParser());

app.get("/",(req,res)=>{
    res.cookie("name","tanya");
    res.send("done");
})

app.get("/read",(req,res)=>{
    console.log(req.cookies);
    res.send("reading cookie");
})

app.get("/encrypt",(req,res)=>{
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash("tanya",salt,function(err,hash){
            console.log(hash);
        });
    });
    res.send("encrypting password");
})

app.get("/compare",(req,res)=>{
    bcrypt.compare("tanya","$2b$10$xFBhkYQEfkzGwJiONvVk/eu4nh36xY.YdJQee6FeDW/UHgmB3kNMO",function(err,result){
        console.log(result);
    })
    res.send("comparing password");
})

app.get("/jwt",(req,res)=>{
    let token = jwt.sign({email: "tanya@gmail.com"},"secret");
    console.log(token);
    res.cookie("token",token);
    res.send("The string which gets attach to the req so that you don't have to login again and again");
})
app.get("/readToken",(req,res)=>{
    let data = jwt.verify(req.cookies.token,"secret");
    console.log(data);
    res.send("reading token");
})

app.listen(3000);