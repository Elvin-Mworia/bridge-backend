const  router=require('express').Router();
const {Ideas}=require("../models");
const {IdeasBought}=require("../models");
const axios=require("axios");
var LocalDateTime = require("@js-joda/core").LocalDateTime;
const mysql=require('mysql2');


//create an idea 
router.post("/create",async(req,res)=>{
    // image:req.file.path;
    const data= {
        pitcherid:req.body.pitcherid,
        pitch:req.body.pitch,
        price:req.body.price,
        time:LocalDateTime.now().toString()

       };
   const pitch= await Ideas.create(data);
    res.json({pitch:pitch,message:'pitch created'});
    
});
//getting all ideas on first page render
const sequelize=require("sequelize");
const res = require('express/lib/response');
router.get("/",async (req,res)=>{
  
    const  listofideas= await Ideas.findAll({order:[[sequelize.literal("updatedAt")]]});
      if(listofideas==null){
          res.json("no ideas have been added!");
      }
      res.send(listofideas.reverse());
   
      
  
  });

//get a specific idea bought
router.get("/ideasbought/:id",async (req,res)=>{
    const id=req.params.id;
try{
   const Id=id.substr(1,id.length);
   console.log(Id);
    const pitch=await IdeasBought.findAll({where:{customerid:Id}});
    res.json(pitch);
    console.log(pitch);
}
catch(err){
    console.log(`dont panick but it seems the the id was not submitted`);

}
    
 
})
//inner join for finding ideas bought by a customer
router.get("/ideascustomer/:id", async (req,res)=>{
    const id=req.params.id;
    const Id=id.substr(1,id.length);
    
 const ideas=await Ideas.findAll({include:[{model:IdeasBought,
            required:true,where:{customerid:Id}}]});
            res.json(ideas);
            console.log(ideas);
           
    
})

//get a specific idea from database
router.get("/ideas/:id",async (req,res)=>{
    const id=req.params.id;
try{
   const Id=id.substr(1,id.length);
   console.log(Id);
    const Idea=await Ideas.findAll({where:{id:Id}});
    res.json(Idea);
}
catch(err){
    console.log(err);

}
    
 
})

//route to update ideasbought table
router.post("/bought",async(req,res)=>{
    // image:req.file.path;
    const data= {
        IdeaId:req.body.ideaid,
        
        customerid:req.body.customerid,
        time:LocalDateTime.now().toString()

       };
   const pitch= await IdeasBought.create(data);
    res.json({pitch:pitch,message:'pitch created'});
    
});
module.exports=router;