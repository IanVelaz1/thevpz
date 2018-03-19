const Interfaz=require("../../models/indexModels/indexModel");

module.exports=(app)=>{

  app.get("/interfaz",(req,res)=>{
   Interfaz.obtenerInterfaz({},(error,interfaz)=>{
      if(error){
        res.json({success:false, msg:"error al recuperar interfaz"});
        throw error
      }else{
        res.json({success:true, interfaz});
      }

   });

  });

  app.post("/interfaz",(req,res)=>{
    const interfaz={
      imagenesCarousel:req.body.imagenesCarousel,
      coleccion1:req.body.coleccion1,
      coleccion2:req.body.coleccion2,
      coleccion3:req.body.coleccion3,
      isEditable:req.body.isEditable
    }
    console.log(interfaz);
    
   Interfaz.guardarInterfazNueva(interfaz,(error,interfaz)=>{
     if(error){
       res.json({success:false,msg:"error al guardar interfaz"});
     }else{
       res.json({success:true,msg:"guardada con exito"});
     }

   });
   
  });

  app.put("/interfaz",(req,res)=>{
   console.log(req.body);
   const id=req.body._id;
   const interfaz={
    imagenesCarousel:req.body.imagenesCarousel,
    coleccion1:req.body.coleccion1,
    coleccion2:req.body.coleccion2,
    coleccion3:req.body.coleccion3,
    isEditable:req.body.isEditable
  }
   
   Interfaz.editarInterfaz(id,interfaz,(error,interfaz)=>{
    if(error){
      res.json({success:false,msg:"error al editar"});
      throw error;
    }else{
      res.json({success:true,msg:"interfaz editada"});
    }
 
    });
   
  });



}