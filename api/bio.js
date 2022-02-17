const  router=require('express').Router();
const {Bio}=require("../models");

router.patch("/update/:id",async (req,res)=>{
    const data={
        email: req.body.email,
        entreprenuerid: req.params.id,
        contact: req.body.contact,
        city: req.body.city,
        county: req.body.county,
        country: req.body.country,
        socialmedia: req.body.socialmedia,
        profilepicture: req.body.profilepicture



    }

    const updated= await Bio.create(data);
    res.json({updated})
})

router.get("/:id",async (req, res)=>{
    const id=req.params.id;
    try{
        const Id=id.substr(1,id.length);
        console.log(Id);
         const info=await Bio.findOne({where:{entreprenuerid:Id}});
         res.json(info);
     }
     catch(err){
         console.log(`dont panick but it seems the the id was not submitted`);
     
     }


})




module.exports=router;