const router= require("express").Router();
const passport=require("passport");
const jwt=require("jsonwebtoken");
const Admin=require("../models/userAdmin");
const config=require("../config/basedatos");

module.exports=(app,passport)=>{

  app.post("/admin",(req,res)=>{
   const nuevoAdmin= new Admin ({
    nombre:req.body.nombre,
    mail:req.body.mail,
    username:req.body.username,
    password:req.body.password
   });
   Admin.guardarAdmin(nuevoAdmin,(error,admin)=>{
     if(error){
       res.json({success:false , msg:"error al crear usuario"});
     }else{
       res.json({success:true, msg:"admin creado"});
     }

   });



  });


  app.post("/admin/login",(req,res)=>{
    const email=req.body.mail;
     console.log(email);
    const password=req.body.password;
    Admin.getUserByEmail(email,(error,admin)=>{
      if(error){
        throw error;
      }if(!admin){
        res.json({success:false, msg:"usuario no encontrado"});
      }try{
        Admin.compararContra(password,admin.password,(error,isMatch)=>{
            if(error){
              res.json("wrong password");
            }if(isMatch){
              const token = jwt.sign(admin.toJSON(),config.secret,{
                expiresIn:3600
              });
              res.json({
                  success:true,
                  token:"bearer "+token,
                  admin:{
                    id:admin._id,
                    email:admin.mail,
                   
                  }
              });
               
            }else{
              res.json({success:false,msg:"password not correct"});
            }

        });
      }catch(TypeError){
      console.log("error usuario no encontrado");
      }

    });


  });

  app.get("/admin/profile", passport.authenticate("jwt",{session:false}),(req,res)=>{
  
    res.send(req.user);

  });






}