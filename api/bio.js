const  router=require('express').Router();
const {Bio}=require("../models");


router.patch("/update/:id",async (req,res)=>{
    const id=req.params.id;
    const Id=id.substr(1,id.length);
    const data={
        email: req.body.email,
        profilepicture:req.file.file,
        entreprenuerid: Id,
        contact: req.body.contact,
        city: req.body.city,
        county: req.body.county,
        country: req.body.country,
        socialmedia: req.body.socialmedia,
       



    }

    const updated= await Bio.update(data,{where:{entreprenuerid:Id}});
    res.json({updated})
})

router.get("/:id",async (req, res)=>{
    const id=req.params.id;
    
    try{
        const Id=id.substr(1,id.length);
        console.log(Id);
         const info=await Bio.findOne({where:{entreprenuerid:Id}});
         res.json(info);
         console.log(info);
     }
     catch(err){
         console.log(`dont panick but it seems the the id was not submitted`);
     
     }


})




module.exports=router;