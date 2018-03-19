const config= require("../../config/basedatos");
const mongoose = require("mongoose");

const coleccionSchema= new mongoose.Schema({

  nombre:{
    type:String,
    required:true,
    unique:true
  },
  descripcion:{
    type:String,
    required:false
  },
  productos:{
    type:Array
  }

});

const Coleccion = module.exports = mongoose.model("colecciones",coleccionSchema);

module.exports.guardarColeccion=(coleccion,callback)=>{
 
  Coleccion.create(coleccion,callback);

};

module.exports.obtenerColecciones=(coleccion,callback)=>{

  Coleccion.find(coleccion,callback);

};

module.exports.obtenerColeccionEspecifica=(id,callback)=>{

  Coleccion.findById(id,callback);

};

module.exports.editarColeccion=(id,coleccion,callback)=>{

   Coleccion.findByIdAndUpdate(id,coleccion, callback);

}

module.exports.findColeccionByName=(nombre,callback)=>{
   Coleccion.find(nombre,callback);
}

module.exports.eliminarColeccion=(id,callback)=>{
  Coleccion.findByIdAndRemove(id,callback);
}


