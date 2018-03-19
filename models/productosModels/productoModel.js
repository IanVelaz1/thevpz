const mongoose=require("mongoose");


const productosSchema=new mongoose.Schema({
idProducto:{
  required:true,
  type:String
},
nombreProducto:{
  required:true,
  type:String
},
requiereInventario:{
  type:Boolean,
  required:true
},
sku:{
  type:String,
  required:false
},
descripcionProducto:{
  type:String,
  required:false
},
imagenes:{
  type:[String],
  required:false
},
existenciasIniciales:{
  type:Number,
  required:false
},
existenciasMinimas:{
  type:Number,
  required:false 
},
existenciasActuales:{
 type:Number,
 default:0, 
 required:false
},
imagenDescripcion:{
  type:String,
  required:false
},precioCompra:{
  type:Number,
  required:false
},
precioVenta:{
  type:Number,
  required:true
},
tienePromocion:{
  type:Boolean,
  required:false,
  default:false
},
nombrePromocion:{
 type:String,
 required:false
},
cantidadPromocion:{
 type:Number,
 required:false,
 default:0
},
categoria:{
type:[String],
required:true
},
tags:{
  type:[String],
  required:false
},
proveedor:{
  type:String,
  required:false
},
added:{
  type:Boolean,
  default:false
},
comentarios:{
  type:Array,
},
preguntas:{
  type:Array
},
cantidadCarrito:{
  type:Number,
  default:1
}

});

const Producto= module.exports=mongoose.model("producto",productosSchema);

module.exports.guardarProducto=(productoNuevo,callback)=>{

Producto.create(productoNuevo,callback);


}

module.exports.obtenerProductos=(productos,callback)=>{
  Producto.find(productos,callback);
}

module.exports.obtenerProductoById=(id,callback)=>{
  Producto.findById(id,callback);
}

module.exports.editarProducto=(id,productoNuevo,callback)=>{

  Producto.findByIdAndUpdate(id,productoNuevo,callback);

}

module.exports.eliminarProductoById=(id,callback)=>{
  Producto.findByIdAndRemove(id,callback);
}
module.exports.findProductoByName=(name,callback)=>{

  Producto.find(name,callback);
}
module.exports.findProductosByMarca=(proveedor,callback)=>{
  Producto.find(proveedor,callback);
}