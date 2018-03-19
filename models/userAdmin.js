const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/basedatos");

const userSchema = new mongoose.Schema({
  nombre:{
   type:String,
   required:String
  },
  mail:{
   type:String,
   required:true,
   unique:true,
   default:"jonathan_va@hotmail.com"
  },
 username:{
   type:String,
   required:true,
   unique:true
 },
 password:{
   type:String,
   required:true,
   default:"tiendaVape123123"
 }


});

const Admin = module.exports= mongoose.model("adminUser",userSchema);

module.exports.guardarAdmin=(adminNuevo,callback)=>{
 bcrypt.genSalt(10,(error,salt)=>{
  bcrypt.hash(adminNuevo.password,salt,(error,hash)=>{
   if(error){throw error}
   else{
     adminNuevo.password=hash;
     adminNuevo.save();
   }

  });
 

 });

 Admin.create(adminNuevo,callback);

};


module.exports.getUserByEmail=(mail,callback)=>{
 Admin.findOne({mail:mail},callback);
};

module.exports.compararContra=(contra,hash,callback)=>{
 
  bcrypt.compare(contra,hash,(error,isMatch)=>{
    if(error)throw error;
    callback(null,isMatch);
  });

};