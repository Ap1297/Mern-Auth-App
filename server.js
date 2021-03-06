const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users  = require("./routes/api/users");
const app = express();

//Bodyparse middleware

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// Mongo DB Config
const db = require("./config/keys").mongoURI;

//Connect to mongoDB
mongoose.connect(
    db,{useNewUrlParser : true}
).then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport/passport")(passport);


//Routes
app.use("/api/users",users);



const port = process.env.PORT || 5000;

app.listen(port , () => console.log(`Server up and running on port ${port} !`));