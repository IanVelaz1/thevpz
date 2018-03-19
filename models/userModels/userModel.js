/*
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../../config/basedatos");

const usuarioSchema= new mongoose.Schema({
 
  nombre:{
   type:Array
  },
  direccion:{
   type:Array
  },
  password:{
   type:String
  },
  mail:{
   type:String,
   unique:true
  },
  pedidos:{
   type:Array
  },telefono:{
    type:String
  }

});
*/
const mongoose= require("mongoose");
const config= require("../../config/basedatos");
const bcrypt = require("bcryptjs");

const userSchema=new mongoose.Schema ({
nombre:{
  type:Array
},
 email:{
 type:String,
 unique:true
 
 },
 password:{
   type:String,
   required:true
 },
 pedidos:{type:Array,
  default:[]
},
 direcciones:{type:Array,
  default:[]
}

});

const Usuario= module.exports = mongoose.model("usuariosFrontEND",userSchema);


module.exports.getUserById=function(id,callback){

  Usuario.findById(id,callback);

}

module.exports.getUserByEmail=function(email,callback){
   Usuario.findOne({email:email},callback);
  

}
module.exports.crearUsuario=function(usuarioNuevo,callback){
  bcrypt.genSalt(10,(error,salt)=>{
     bcrypt.hash(usuarioNuevo.password,salt,(error,hash)=>{
           if(error){throw error}
           else{
           usuarioNuevo.password=hash;

           Usuario.create(usuarioNuevo,callback);
           }

     });

  });

 

}

module.exports.compararContra=function(miContra,hash,callback){
  
  bcrypt.compare(miContra,hash,(error,isMatch)=>{
    if(error) throw error;
    callback(null,isMatch);
  });

}

module.exports.obtenerUsuarios=(objeto,callback)=>{
  
  Usuario.find(objeto,callback);

}

module.exports.editarUsuario=(id,usuario,callback)=>{
  Usuario.findByIdAndUpdate(id,usuario,callback);
}
