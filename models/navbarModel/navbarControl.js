const mongoose=require("mongoose");

const navbarSchema=new mongoose.Schema({
 
  navMain:Array,
  isEditableNav:{
   type:Boolean,
   default:true
  }


});

const Navbar=module.exports=mongoose.model("navbarmain",navbarSchema);

module.exports.guardarNavbar=(navbar,callback)=>{

  Navbar.create(navbar,callback);
   
}

module.exports.obtenerNavbar=(navbar,callback)=>{
  Navbar.find(navbar,callback);
}

module.exports.editarNavbar=(id,navbar,callback)=>{
  Navbar.findByIdAndUpdate(id,navbar,callback);
}