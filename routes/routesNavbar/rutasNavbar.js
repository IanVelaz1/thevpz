const Navbar=require("../../models/navbarModel/navbarControl");

module.exports=(app)=>{

 app.get("/navbarfront",(req,res)=>{

  Navbar.obtenerNavbar({},(error,navbar)=>{
    if(error){
      res.json({success:false,msg:"error al recuperar navbar"});
      throw error;
    }else{
      res.json({success:true,navbar});
    }

  });
  

 });

 app.post("/navbarfront",(req,res)=>{

 
const navbar={navMain:req.body}
console.log(navbar);

  Navbar.guardarNavbar(navbar,(error,navbar)=>{
    if(error){
      res.json({success:false,msg:"error al guardar navbar"});
      throw error;
    }else{
      res.json({success:true,msg:"navbar guardada"});
    }

  });
 
 });

 app.put("/navbarfront/:id",(req,res)=>{
 let id=req.params.id;
 const navbar={navMain:req.body}  

  Navbar.editarNavbar(id,navbar,(error,navbar)=>{
   if(error){
     res.json({success:false,msg:"Error al editar navbar"});
   }else{
     res.json({success:true,msg:"navbar editada"});
   }
   
  });

 });


}