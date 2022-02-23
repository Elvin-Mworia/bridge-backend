const  router=require('express').Router();
const {Ideas}=require("../models");
const {IdeasBought}=require("../models");
const axios=require("axios");
var LocalDateTime = require("@js-joda/core").LocalDateTime;
const mysql=require('mysql2');
const db=mysql.createConnection({
    host: 'localhost',
    user:"angerfist",
    password:"9662@#$%&",
    database: 'bridge'


});

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
    // console.log(Id);
//     var ideas;
//     db.connect((err)=>{
//         if(err) throw err;
//         console.log("connected to db...");
        
//     });
    
//     try{
//     db.query(`select * from bridge.ideas left join bridge.ideasboughts on bridge.ideas.id=bridge.ideasboughts.ideaid where bridge.ideasboughts.customerid="${Id}"`,(err,res)=>{
//         if(err) throw err;
//         console.log(res);

        
//     });
// }catch(err){
//     console.log("something went wrong");
    
// }finally{
//     db.close((err)=>{
//     if(err){ throw err};
    
//    }); 
//    console.log("finished updating from db and safely exiting....");
// } 
// res.json(ideas);
// console.log(ideas);
const ideas=await Ideas.findAll({include:[{model:IdeasBought,
required:false}]});
var Pitches=[];
ideas.forEach((b,index,arr)=>{
    axios.get(`http://localhost:3001/idea/ideas/:${b.IdeaId}`).then((res)=>{

    Pitches.push(res.data);
    })

    })
    res.json(Ideas);
console.log(Ideas);
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