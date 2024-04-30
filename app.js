const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
//*Receiving and saving data*/
const Blog = require("./model/blog");

// express app
const app = express();

//Register View Engin
app.set("view engine", "ejs");

//listen for requests
// con mongoDB + mongoose lo mettiamo nel mongoose.connect

//Connect to MongoDB
const dbURI =
  "mongodb+srv://jawidTest:jawidTest123@nodecourse.cfcb5sv.mongodb.net/node-course@?retryWrites=true&w=majority&appName=nodecourse";

mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
//Middleware and Static File management
app.use(express.static("public"));

app.use(morgan("tiny"));

// routing methods in express:
app.get("/", (req, res) => {
  // res.render("index", {
  //   title: "Home",
  //   blogs,
  // }); //con ejs
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  }); // con ejs
});

//* How to render data come from server
//blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .then((blogs) => {
      res.render("index", {
        title: "Blogs",
        blogs,
      });
    })
    .catch((err) => console.log(err));
});

app.get("/blogs/create", (req, res) => {
  res.render("create", {
    title: "Create",
  }); // con ejs
});

//404 page
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404",
  }); //in ejs, possiamo acnhe concatenare status code
});
