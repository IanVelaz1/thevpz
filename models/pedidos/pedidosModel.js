const mongoose = require("mongoose");


const pedidosSchema=new mongoose.Schema({
idPedido:{
  type:String 
},
idCliente:{
  type:String
},
cliente:{
  type:Object
},
productos:{
  type:Array
},
direccion:{
  type:Object
},
total:{
  type:Number
},
estadoPedido:{
  type:String
},
fechaPedido:{
  type:Date
},
envio:{
 type:Object
}

});

const Pedido=module.exports=mongoose.model("pedidos",pedidosSchema);

module.exports.guardarPedido=(pedido,callback)=>{

  Pedido.create(pedido,callback);

}

module.exports.recuperarPedidos=(pedido,callback)=>{
  Pedido.find(pedido,callback);
}

module.exports.recuperarPedidoById=(id,callback)=>{
  Pedido.findById(id,callback);
}

module.exports.editarPedidoById=(id,pedido,callback)=>{
  Pedido.findByIdAndUpdate(id,pedido,callback);
}
module.exports.buscarPedidoByUser=(id,callback)=>{
  Pedido.find(id,callback);
}

module.exports.buscarPedidoByFecha=(fecha,callback)=>{
   Pedido.find(fecha,callback);
}