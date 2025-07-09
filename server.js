const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3019;

const app = express();


app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://127.0.0.1:27017/students');
const db = mongoose.connection;
db.once('open', () => {
  console.log("mongodb connection successful");
});


const userSchema = new mongoose.Schema({
  name: String,
  class: Number,      
  Parent: String,
  add: String,
  addd: String,
  adddd: String,
  addddd: Number,
  adddddd: String
});

const Users = mongoose.model("data", userSchema);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/post', async (req, res) => {
  const {
    name,
    class: classNumber,
    Parent,
    add,
    addd,
    adddd,
    addddd,
    adddddd
  } = req.body;

  const user = new Users({
    name,
    class: classNumber,
    Parent,
    add,
    addd,
    adddd,
    addddd,
    adddddd
  });

  await user.save();
  console.log(user);
  res.send("Form submitted successfully");
});


app.listen(port, () => {
  console.log('server started');
});
