const express=require('express');
const router=express.Router();
const bcrypt=require("bcrypt");
const {sign}=require("jsonwebtoken");
//registering
const {Users}=require("../models");

router.post("/register", async (req,res)=>{ 
    const {firstname,secondname,email,password,customer,price}=req.body;
    var plan;
    // console.log(price);
    if(price==="2" && customer==="investor"){
      plan="bronze";
      
      console.log(plan);
    }
    else if(price==="5"  && customer==="investor"){
      
      plan="silver";
      console.log(plan);
    }
     else if (price==="10" && customer==="investor"){
      plan="gold";
      console.log(plan);

     }
     else{
         plan=null;
     }

    // const lastname=req.body.lastname;
    
    // const investor=req.body.investor;
    // const entreprenuer=req.body.entreprenuer;
    //     const email=req.body.email;
    //    const password=req.body.password;
    //     const firstname=req.body.firstname;
        //  console.log(password);
        //  console.log(email);
        //  console.log(username);
  
  try{
    bcrypt.hash(password,10).then(async (hash)=>{
        try{
      if( await Users.findAll({where:{email:email}})==="true"){
          res.json("Another account was registered with the email")
      }else{
        if(customer==="investor"){
            const newUser={firstname:firstname,lastname:secondname,email:email,password:hash,customer:customer,plan:plan}
            const user= await Users.create(newUser);
            res.json({message:`Thank ${user.firstname} for registering`});
        }else{
            const newUser={firstname:firstname,lastname:secondname,email:email,password:hash,customer:customer}
            console.log(newUser);
            const user= await Users.create(newUser);
            res.json({message:`Thank ${user.firstname} for registering`});

        }
      }
        
    } catch(err){
        console.log("another account was registered with the email,use another email please!");
    }
}
            
        );
    
   
}
  catch(err){
      console.log(err);
  }
     
  });
  



//logging in
router.post("/login",async (req,res)=>{
const {email,password}=req.body;

const user=await Users.findOne({where:{email:email}});

console.log(user);

    if(user==null || user==undefined){
        res.send({message:"Username or email was not found"});
    }
   


const correctPassword=user.password;



bcrypt.compare(password,correctPassword).then((match)=>{
    try{
    if(!match){res.send({message:"Wrong email and password combination",status:301});
console.log("logging in failed,try again!")
}
    const accessToken=sign({username:user.email,id:user.id},"ec0d54fd-d72e-4a53-aa72-b8ceabd148af");
    
    res.json({accessToken:accessToken,
        message:"Logged in successfully",username:user.firstname,
    status:"200",
customer:user.customer,user:user});
    console.log(accessToken);
 console.log("logged in successfully.");
    }
    catch(err){
        console.log("logging in failed,try again!");
    }
})

});
module.exports=router;
