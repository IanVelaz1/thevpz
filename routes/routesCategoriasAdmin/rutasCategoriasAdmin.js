const Categoria= require("../../models/categoriasModels/categoriasModel");

module.exports=(app)=>{
 app.get("/categorias",(req,res)=>{
  
  Categoria.obtenerCategorias({},(error,categorias)=>{
    if(error){
      res.json({success:false, msg:"no se han recuperado las categorias"});
      throw error;
    }else{
      res.json(categorias);
    }

  });

 });

 app.post("/categorias",(req,res)=>{
  const categoriaNueva={
    nombre:req.body.nombre,
    descripcion:req.body.nombre
  }

  Categoria.guardarCategoriaNueva(categoriaNueva,(error,categoria)=>{
    if(error){
      res.json({success:false,msg:"error al guardar categoria nueva"});
      throw error;
    }else{
      res.json({success:true,msg:"categoria creada con exito"});
    }
  });

 });

 app.put("/categorias/:id",(req,res)=>{
  let categoriaNueva=req.body;
  let id=req.params.id;
  Categoria.editarCategorias(id,categoriaNueva,(error,categoria)=>{
    if(error){
      res.json({success:false,msg:"error al editar categoria"});
    }else{
      res.json({success:true,msg:"categoria editada con exito"});
    }
  });


 });

 app.get("/categorias/:id",(req,res)=>{
   let id=req.params.id;
   Categoria.obtenerCategoriaById(id,(error,categoria)=>{
     if(error){
       res.json({success:false,msg:"error al obtener la categoria"});
     }else{
      res.json({success:true,categoria});
     }

   });
 });

 app.delete("/categorias/:id",(req,res)=>{
  let id=req.params.id;
    Categoria.eliminarCategoria(id,(error,categoria)=>{
       if(error){
         res.json({success:false,msg:"error al eliminar categoria"});
       }else{
         res.json({success:true,msg:"eliminada"});
       }
    });
 });

 






}
