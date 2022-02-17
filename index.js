const express=require('express');
require("dotenv").config();
const app=express();
const cors=require('cors');
const db=require("./models");

//controllers
const Auth=require("./api/auth");
const Pitch=require("./api/pitch");
const Bio=require("./api/bio");
const Idea=require("./api/ideas");
const User=require("./api/user");
const Stripe=require("./api/stripe");




//middleware for logging out if an incoming request
const logger=(req,res,next)=>{
    console.log("incoming request");
    next();
 }

 //allowed origin which the server can accept request from
 var corOption={
    origin:"*"
}

//setting up cors
app.use(cors(corOption));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
  
app.use(logger);
//static files ie profile pictures
app.use("/images",express.static("images"));

//routes
app.use("/auth",Auth);
app.use("/pitch",Pitch);
app.use("/bio",Bio);
app.use("/idea",Idea);
app.use("/user",User);
app.use("/stripe",Stripe);


const port=3001;
//attempting to connect to the database first before starting the server
db.sequelize.sync({logging:console.log,force:false}).then(()=>{
    
    console.log("Connection to the database established");
    
    app.listen(port,()=>{
        console.log(`running on port ${port}`);
});



}).catch(err=>(console.log(`Something went wrong ${err}`)));