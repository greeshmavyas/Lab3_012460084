const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const app = express();
var config = require("./config/settings");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

//set up mongoDb connection
// Set up Database connection
var mongoose = require("mongoose");
var connStr =
  config.database_type +
  "+srv://" +
  config.database_username +
  ":" +
  config.database_password +
  "@" +
  config.database_host +
  ":" +
  "/" +
  config.database_name;
console.log(connStr);
mongoose.connect(connStr, { useNewUrlParser: true, poolSize: 10 }, function(
  err
) {
  if (err) throw err;
  else {
    console.log("Successfully connected to MongoDB");
  }
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(8080, () => {
  console.log("GraphQL server started on port 8080");
});
