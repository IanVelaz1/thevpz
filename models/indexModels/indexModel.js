const mongoose=require("mongoose");

const interfazNueva= new mongoose.Schema({

 imagenesCarousel:Array,
//colecciones:Array,
 coleccion1:String,
 coleccion2:String,
 coleccion3:String,
 isEditable:Boolean
});

const Interfaz = module.exports = mongoose.model("interfaz",interfazNueva);

module.exports.guardarInterfazNueva=(interfaz,callback)=>{

Interfaz.create(interfaz,callback);

}

module.exports.obtenerInterfaz=(interfaz,callback)=>{
  Interfaz.find(interfaz,callback);
}

module.exports.editarInterfaz=(id,interfaz,callback)=>{
  Interfaz.findByIdAndUpdate(id,interfaz,callback);
}