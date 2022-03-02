const  router=require('express').Router();
const {Bio}=require("../models");
const path=require("path");


router.post("/update/:id",async (req,res)=>{
    console.log(req.body);
    console.log(Object.assign({},req.files));
    const id=req.params.id;
    const Id=id.substr(1,id.length);
    let image;
let uploadPath;
if(req.files==undefined || req.files==null){
    uploadPath=__dirname+"/images/"+"profilepic.png";
}
else{
    // uploadPath=path.resolve(__dirname+"../images/")+image.name;
    image=Object.assign({},req.files.images);
    // uploadPath="/images/"+image.name;
    uploadPath=__dirname+"/images/"+image.name;
    image.mv(uploadPath,async(err)=>{
    
        if(err)return res.json({message:"could not upload the image"});
    }
     
    
    )

}


const picpath=uploadPath.substr(40,uploadPath.length);
console.log(picpath);
//console.log(image);
//console.log(uploadPath);
const data={
    
    profilepicture:picpath,
    UserId:Id,
    contact: req.body.contact,
    city: req.body.city,
    county: req.body.county,
    country: req.body.country,
    socialmedia: req.body.socialmedia,
   }
try{


const user=await Bio.findOne({where:{UserId:Id}})
console.log(user);
if(user!=null){
    const updated= await Bio.update(data,{where:{UserId:Id}});
res.json({updated})
    
}else{
    const updated= await Bio.create(data);
    res.json({updated})

}



}catch(err){
    console.log(err);
}
   


   
})
//getting data of a specific entreprenuer
router.get("/data/:id",async (req, res)=>{
    const id=req.params.id;
    
    try{
        const Id=id.substr(1,id.length);
        console.log(Id);
         const info=await Bio.findOne({where:{UserId:Id}});
         res.json(info);
         console.log(info);
     }
     catch(err){
         console.log(`seems the id was not submitted`);
     
     }


})




module.exports=router;