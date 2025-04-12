var express = require('express');
const cors = require('cors');
var app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const DBURL = process.env.DB_URL || 'mongodb://localhost:27017/logistics';
app.use( bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());

process.env.TZ = "Asia/Calcutta";

mongoose.connect(DBURL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("connected");
});

const logRouter = require("./routes/LogRoutes");
app.use("/api", logRouter);

app.listen(port, () => {
   console.log(`Server listening on ${port}`);
})