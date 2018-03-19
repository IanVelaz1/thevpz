const passport = require("passport");
const jwt = require("jsonwebtoken");
const User=require("../../models/userModels/userModel");
const config=require("../../config/basedatos");

module.exports=(app,passport)=>{

  app.post("/signup", (req, res) => {

    console.log(req.body);
    
    usuarioNuevo={
      nombre:req.body.nombre,
      direccion:req.body.direccion,
      password:req.body.password,
      email:req.body.email,
      pedidos:req.body.pedidos,
      telefono:req.body.telefono
    }
    
    User.crearUsuario(usuarioNuevo, (error, usuario) => {
      if (error){ 
        res.json({
        created: false,
        msg: "error al crear usuario",
        error:error
      }); }
      else {
        res.json({
          created: true,
          msg: "usuario registrado"
        });
      }

    });
    

  });

  app.post("/usuario/login", (req, res) => {
    const mail = req.body.email;
    const password = req.body.password;
    User.getUserByEmail(mail, (error, user) => {
      if (error) {
        res.json("not found");
      } if (!user) {
        res.json({
          success: false,
          msg: "error usuario no encontrado"
        });
      }
      try{
        User.compararContra(password, user.password, (error, isMatch) => {
          if (error) {
            res.json("not found");
          }
          if (isMatch) {
            const token = jwt.sign(user.toJSON(), config.secret, {
              expiresIn: 3600
            });
            res.json({
              success: true,
              token: "bearer "+token,
              user: {
                id: user._id,
                email: user.email,
                password: user.password
  
              }
  
            });
          } else {
  
            res.json({
              success: false,
              msg: "Contraseña o usuario incorrecto"
            });
          }
        });

      }catch(TypeError){
        console.log("error user not found");
      }
      

    });


  });


  app.get("/usuario/perfil",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json(req.user);
  });

  app.get("/usuario/loggedIn/:id",(req,res)=>{
    
    let id=req.params.id;

    User.getUserById(id,(error,user)=>{
      if(error){
      res.json({success:false,msg:"error al recuperar usuario"});
      }else{
      res.json({success:true,user});
      }
    });

  });

  app.post("/usuario/editar/:id",(req,res)=>{
    var id=req.body._id;
    var usuario=req.body;
    
    console.log(req.body);
    User.editarUsuario(id,usuario,(error,user)=>{
      if(error){
        res.json({success:false,msg:"usuario no editado"});
        throw error;
      }else{
        res.json({success:true,msg:"usuario editado"});
      }
    });
    
  });

}