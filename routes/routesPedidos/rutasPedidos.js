const Pedido=require("../../models/pedidos/pedidosModel");

module.exports=(app)=>{
 
app.get("/pedidos",(req,res)=>{

 Pedido.recuperarPedidos({},(error,pedidos)=>{
 if(error){
   res.json({success:false, msg:"error al recuperar pedidos"});
   throw error;
 }else{
   res.json({success:true, pedidos});
 }

 });

});

app.post("/pedidos",(req,res)=>{
 
  const pedido=req.body;
  Pedido.guardarPedido(pedido,(error,pedido)=>{
   if(error){
    res.json({success:false, msg:"error al crear pedido"});
    throw error;
   }else{
     res.json({success:true,msg:"pedido guardado"});
   }

  });

});

app.get("/pedidos/:id",(req,res)=>{
 
const id=req.params.id;

Pedido.recuperarPedidoById(id,(error,pedido)=>{

   if(error){
    res.json({success:false, msg:"error al recuperar"});
    throw error;
   }
   else{
     res.json({success:true,pedido});
   }

 });

});

app.put("/pedidos/:id",(req,res)=>{
 const id=req.params.id;
 const pedido=req.body;
  
 Pedido.editarPedidoById(id,pedido,(error,pedido)=>{
   if(error){
    res.json({success:false, msg:"error al editar pedido"});
    throw error;
   }else{
     res.json({success:true, mag:"producto editado"});
   }

 });

});


app.get("/pedidos/user/:id",(req,res)=>{
  const id=req.params.id;
  const objeto={idCliente:id};
  Pedido.buscarPedidoByUser(objeto,(error,pedido)=>{
    if(error){
      res.json({success:false,msg:"error al recuperar pedidos"});
      throw error;
    }else{
      res.json({success:true,pedido});
    }
  });
});

app.post("/pedidos/fecha",(req,res)=>{
 const fecha=req.body;
 console.log(fecha);

 Pedido.buscarPedidoByFecha(fecha,(error,pedido)=>{
   if(error){
     res.json({success:false, msg:"erroral recuperar pedidos by fecha"});
   }else{
     res.json({success:true, pedido});
   }

 });

});



}