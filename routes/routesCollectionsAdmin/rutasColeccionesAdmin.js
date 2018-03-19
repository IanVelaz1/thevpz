const Coleccion=require("../../models/collections/colecciones");
const path=require("path");
module.exports=(app)=>{
 
  app.get("/colecciones",(req,res)=>{
  
    Coleccion.obtenerColecciones({},(error,colecciones)=>{
       if(error){
         res.json({success:false, msg:"error al recuperar colecciones"});
         throw error;
       }else{
         res.json({success:true, colecciones});
       }

    });

  });

  app.post("/colecciones",(req,res)=>{
    const coleccionNueva={
     nombre:req.body.nombre,
     descripcion:req.body.descripcion,
     productos:req.body.productos
    };
   Coleccion.guardarColeccion(coleccionNueva,(error,coleccion)=>{
      if(error){
       res.json({success:false, msg:"error al guardar coleccion"});
       throw error;
      }else{
       res.json({success:true, msg:"coleccion guardada"});
      }
   });

  });

  app.get("/colecciones/:id",(req,res)=>{
    
   const id=req.params.id;
    Coleccion.obtenerColeccionEspecifica(id,(error,coleccion)=>{
     if(error){
       res.json({success:false, msg:"error al obtenerColeccion"});
       throw error;
     }else{
       res.json({success:true,coleccion});
       
     }

    });

  });
  
  app.post("/colecciones/:id",(req,res)=>{
   const id=req.params.id;
   const objetoNuevo={
     nombre:req.body.nombre,
     descripcion:req.body.descripcion,
     productos:req.body.productos
   };
   Coleccion.editarColeccion(id,objetoNuevo,(error,coleccion)=>{
    if(error){
      res.json({success:false,msg:"error al editar coleccion"});
    }else{
      res.json({success:true,msg:"coleccion editada"});
    }
    
   });

  });

  app.post("/colecciones/buscar/nombre",(req,res)=>{
    const nombre= req.body.nombre;
    console.log(req.body);
  const objeto={nombre:{$regex:'.*' + nombre + '.*'}}
  Coleccion.findColeccionByName(objeto,(error,coleccion)=>{
   if(error){
     res.json({success:false,msg:"error al recuperar coleccion"});
     throw error
   }else{
     res.json({success:true,coleccion});
   }

  });


  });

  app.delete('/colecciones/:id',(req,res)=>{
   
    const id=req.params.id;

    Coleccion.eliminarColeccion(id,(error,coleccion)=>{
      if(error){
        res.json({success:false, msg:"error al eliminar la coleccion" })
      }else{
        res.json({success:true, msg:"coleccion eliminada"})
      }
    });

  });

 




}