const config= require("../../config/basedatos");
const Producto=require("../../models/productosModels/productoModel");
module.exports= (app)=>{
  app.get("/productos",(req,res)=>{
   Producto.find({},(error,productos)=>{
    if(error){
      res.json({success:false,msg:"producto no recuperado"});
    }else{
      res.json({success:true,productos});
      
    }

   });

  });

  app.post("/productos",(req,res)=>{

    const nuevoProducto= new Producto ({
      idProducto:req.body.idProducto,
      nombreProducto:req.body.nombreProducto,
      requiereInventario:req.body.requiereInventario,
      sku:req.body.sku,
      descripcionProducto:req.body.descripcionProducto,
      imagenes:[req.body.imagen1,req.body.imagen2,req.body.imagen3],
      existenciasIniciales:req.body.existenciasIniciales,
      existenciasMinimas:req.body.existenciasMinimas,
      imagenDescripcion:req.body.imagenDescripcion,
      precioCompra:req.body.precioCompra,
      precioVenta:req.body.precioVenta,
      tienePromocion:req.body.tienePromocion,
      nombrePromocion:req.body.nombrePromocion,
      cantidadPromocion:req.body.cantidadPromocion,
      categoria:req.body.categoria,
      tags:req.body.tags,
      proveedor:req.body.proveedor
   });

   console.log(nuevoProducto);

   Producto.guardarProducto(nuevoProducto,(error,producto)=>{
    if(error){
      res.json({created:false,msg:"Fallo al crear producto"});
      console.log(req.body);
      throw error;
    }else{
      res.json({created:true,msg:"producto creado con exito"});
      console.log(req.body);
    }

   });

  });

  app.get("/productos/:id",(req,res)=>{
    const id=req.params.id;
    console.log(id);
   Producto.obtenerProductoById(id,(error,producto)=>{
    if(error){
      res.json({success:false,msg:"error al recuperar producto"});
    }else{
      res.json({success:true,producto});
    }

   });


  });
  
  app.post("/productos/name",(req,res)=>{
    var nombre =req.body.nombreProducto;
    var objeto={nombreProducto:{$regex:'.*' + nombre + '.*'}};
    console.log(req.body);
      Producto.findProductoByName(objeto,(error,productos)=>{
       if(error){
         res.json({success:false,msg:"error al recuperar productos"});
         throw error;
       }else{
         res.json({success:true, productos});
       }
      });
      
  });
  
  app.put("/producto",(req,res)=>{
    console.log(req.body.id);
    const id=req.body._id;
    const nuevoProducto=({
      idProducto:req.body.idProducto,
      nombreProducto:req.body.nombreProducto,
      requiereInventario:req.body.requiereInventario,
      sku:req.body.sku,
      descripcionProducto:req.body.descripcionProducto,
      imagenes:req.body.imagenes,
      existenciasIniciales:req.body.existenciasIniciales,
      existenciasActuales:req.body.existenciasActuales,
      existenciasMinimas:req.body.existenciasMinimas,
      imagenDescripcion:req.body.imagenDescripcion,
      precioCompra:req.body.precioCompra,
      precioVenta:req.body.precioVenta,
      tienePromocion:req.body.tienePromocion,
      nombrePromocion:req.body.nombrePromocion,
      cantidadPromocion:req.body.cantidadPromocion,
      categoria:req.body.categoria,
      tags:req.body.tags,
      proveedor:req.body.proveedor
   });
   


  Producto.editarProducto(id,nuevoProducto,(error,producto)=>{
   if(error){
     res.json({success:false,msg:"error al editar producto"});
     throw error
   }else{
     res.json({success:true,msg:"producto editado"});
   }

  });

  });

  app.delete("/producto/delete/:id",(req,res)=>{
    id=req.params.id;
   Producto.findByIdAndRemove(id,(error,producto)=>{
    if(error){
      res.json({success:false,msg:"error al eliminar el producto"});
    }else{
      res.json({success:true,msg:"producto eliminado"});
    }
   });
   
  });

  app.post("/producto/find/:proveedor",(req,res)=>{
    //let marca=req.body.marca;
    console.log(req.params);

    Producto.findProductosByMarca(req.params,(error,producto)=>{
     if(error){
       res.json({success:false,msg:"error al obtener Productos sugeridos"});
     }else{
       res.json({success:true,producto});
     }
 
    });
  });

} 