// Get dependencies
var express = require("express");
var path = require("path");
var http = require("http");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// import the routing file to handle the default (index) route
var index = require("./server/routes/app");

// import task routes
var taskRoutes = require("./server/routes/tasks");

// connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/tasktracker")
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.log("Connection failed: " + err));

var app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// Angular dist folder
app.use(express.static(path.join(__dirname, "dist/task-tracker/browser")));

// routes
app.use("/", index);
app.use("/tasks", taskRoutes);

// fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist/task-tracker/browser/index.html"));
});

// port
const port = process.env.PORT || "3000";
app.set("port", port);

const server = http.createServer(app);
server.listen(port, () => console.log("API running on localhost:" + port));
