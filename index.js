require('dotenv').config();
const express=require('express');
const bodyParser=require("body-parser");
const app=express();
const mongoose = require("mongoose");
// const passport = require("passport");
const cors = require("cors");

//Import Routes
const apiRoute=require('./routes/apis');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({
	extended: true
  }));
app.use(bodyParser.json());

// connection to mongodb
mongoose.connect(
	process.env.MONGODB_URL,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log("Successfully connected to cloud database")
);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", false);


app.use(require("express-session")({
	secret: "AnubhavGoyalthebackenddeveloper",
	resave: false,
	saveUninitialized: false
}));

// app.use(passport.initialize());
// app.use(passport.session());

app.get('/',(req,res)=>{
	res.status(200).json({
		"status": "true",
		"message": "Welcome to the Gramoday app"
	});
});

//Route Middleware
app.use('/api',apiRoute);

app.listen(process.env.PORT || 3000, function() {
	console.log("Server started on port 3000");
});