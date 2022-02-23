const multer=require('multer');
const path=require("path");
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.resolve(__dirname,'./images' ));
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname));
    }
    
})
const upload=multer({
    storage:storage,
    limits:{fileSize:"1000000"},
    fileFilter:(req,file,cb)=>{
        const fileTypes=/jpeg|jpg|png/
        const mimtype=fileTypes.test(file.mimetype)
        const extname=fileTypes.test(path.extname(file.originalname))
       if(mimtype && extname ){
           return cb(null,true)
       }  
       cb('give the proper file formats to upload') 
    }
}).single("image")
module.exports=upload;