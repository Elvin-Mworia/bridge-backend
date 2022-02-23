const  router=require('express').Router();
const {Users}=require("../models");

router.get("/:id",async (req,res)=>{
    const id=req.params.id;
try{
   const Id=id.substr(1,id.length);
  
    const user=await Users.findByPk(Id);
    res.json(user);
    console.log(user);
}
catch(err){
    console.log(`no user with the following id:${id} was found`);

}
    
 
})

module.exports=router;