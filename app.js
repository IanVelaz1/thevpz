const express= require("express"),
app = express(), 
bodyParser = require("body-parser");
const morgan = require ("morgan");
const mongoose = require ("mongoose");
const cors = require("cors");
const passport = require ("passport");
const path = require ("path");
const config=require("./config/basedatos");
const port=process.env.PORT || 8080;

mongoose.connect(config.db,{
  useMongoClient:true
});
mongoose.Promise=global.Promise;
require("./config/passportUsuarios")(passport);
require("./config/passport")(passport);


//middlewares
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require("./routes/rutasAdmin")(app,passport);
//rutas de productos admin
require("./routes/routesProductosAdmin/rutasProductosAdmin")(app);
//rutas de categorias admin
require("./routes/routesCategoriasAdmin/rutasCategoriasAdmin")(app);
require("./routes/routesCollectionsAdmin/rutasColeccionesAdmin")(app);
require("./routes/routesInterfaz/rutasInterfaz")(app);
require("./routes/routesNavbar/rutasNavbar")(app);
require("./routes/routesUsuarios/rutasUsuarios")(app,passport);
require("./routes/routesPedidos/rutasPedidos")(app);
app.use(express.static(path.join(__dirname,"dist")));

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,"dist/index.html"));
});



app.listen(port,(req,res)=>{

  console.log("conectado usando puerto "+port);

});