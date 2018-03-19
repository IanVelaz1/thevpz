const mongoose=require("mongoose");
const config=require("../../config/basedatos");

const categoriaSchema = new mongoose.Schema({

  nombre:{
    type:String,
    required:true
  },
  descripcion:{
    type:String,
    required:false
  }

});

const Categoria= module.exports = mongoose.model("categorias",categoriaSchema);

module.exports.guardarCategoriaNueva=(categoriaNueva,callback)=>{
 
  Categoria.create(categoriaNueva,callback);

}

module.exports.obtenerCategorias=(objeto,callback)=>{
  Categoria.find(objeto,callback);
}

module.exports.editarCategorias=(id,objeto,callback)=>{
  Categoria.findByIdAndUpdate(id,objeto,callback);
}

module.exports.obtenerCategoriaById=(id,callback)=>{
  Categoria.findById(id,callback);
}

module.exports.eliminarCategoria=(id,callback)=>{
  Categoria.findByIdAndRemove(id,callback);
}