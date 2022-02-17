const  router=require('express').Router();
const {Pitch}=require("../models");
var LocalDateTime = require("@js-joda/core").LocalDateTime;

const sequelize=require("sequelize");
router.get("/",async (req,res)=>{
  
    const  listofpitch= await Pitch.findAll({order:[[sequelize.literal("updatedAt")]]});
      if(listofpitch==null){
          res.json("no pitches have been added!");
      }
      res.send(listofpitch.reverse());
   
      
  
  });
  //find all the pitches of a user
  router.get("/entrepreneur/:id",async (req,res)=>{
 const id=req.params.id;
 const Id=id.substr(1,id.length);
  
    const  listofpitch= await Pitch.findAll({where:{entreprenuer:Id}});
      if(listofpitch==null){
          res.json("you have no pitches bro!");
      }
      res.json({list:listofpitch.reverse()});
   
      
  
  });
  //finding a specific pitch based on id
router.get("/:id",async (req,res)=>{
    const pitchid=req.params.id;
try{
   const Pitchid=pitchid.substr(1,pitchid.length);
   console.log(pitchid);
    const pitch=await Pitch.findByPk(Pitchid);
    res.json(pitch);
}
catch(err){
    console.log(`no pitch with the following id:${pitchid} was found`);

}
    
 
})

router.post("/create",async(req,res)=>{
    // image:req.file.path;
    const data= {
        entreprenuer:req.body.id,
        pitch:req.body.pitch,
        time:LocalDateTime.now().toString()};
   const pitch= await Pitch.create(data);
    res.json({pitch:pitch,message:'pitch created'});
    
});


  module.exports = router;