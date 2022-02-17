const  router=require('express').Router();
const {Ideas}=require("../models");
const {Ideasbought}=require("../models");
var LocalDateTime = require("@js-joda/core").LocalDateTime;

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
router.get("/",async (req,res)=>{
  
    const  listofideas= await Ideas.findAll({order:[[sequelize.literal("updatedAt")]]});
      if(listofideas==null){
          res.json("no ideas have been added!");
      }
      res.send(listofideas.reverse());
   
      
  
  });

//get a specific idea
router.get("/:id",async (req,res)=>{
    const id=req.params.id;
try{
   const Id=id.substr(1,id.length);
   console.log(Id);
    const pitch=await Ideasbought.findByPk(Id);
    res.json(pitch);
}
catch(err){
    console.log(`dont panick but it seems the the id was not submitted`);

}
    
 
})

router.post("/bought",async(req,res)=>{
    // image:req.file.path;
    const data= {
        ideaid:req.body.ideaid,
        price:req.body.price,
        time:LocalDateTime.now().toString()

       };
   const pitch= await Idea.create(data);
    res.json({pitch:pitch,message:'pitch created'});
    
});
module.exports=router;