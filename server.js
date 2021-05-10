const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const todo = require("./routes/api/ToDo");
const app = express();

var postMessageRoutes = require('./routes/api/postMessages');
var Messures = require('./routes/api/Messures');
const cors = require("cors");



app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

function success(res, payload){
  return res.status(200).json(payload);
}
// DB Config
//const db = require("./config/keys").mongoURI;

// Connect to MongoDB



mongoose.set("useFindAndModify", false);
mongoose
  .connect(
    "mongodb+srv://admin:prueba123@try.se00v.mongodb.net/api?retryWrites=true&w=majority",
    { useNewUrlParser: true,
      useUnifiedTopology: true },
      (err, res) => {
        if (err) {
          throw err;
        } else {
          console.log("Conexión con Mongoose correctamente");
          app.listen(process.env.PORT, "0.0.0.0", () => {
            console.log("######## BACKEND #######");
          });
        }
      }
    );
    


app.use(passport.initialize()); 
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/Todos",todo);
app.use('/api/postMessages',postMessageRoutes);
app.use('/api/Messures',Messures);
//const port = process.env.PORT || 5000; 


app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("Funciona~#############");

});
