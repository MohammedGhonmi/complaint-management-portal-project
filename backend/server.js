const express = require('express')
const complaintRouter = require('./routes/complaints')
const userRouter = require('./routes/users');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');


//For global variables that are not shown to the outside world for security reasons
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.DB_CONNECTION;

// start a connection with the database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    }))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json())
app.use(setUser)

// the routes related to the system
app.use('/complains', complaintRouter)
app.use('/users', userRouter)

function setUser(req, res, next) {
  const userId = req.body.userId
  if (userId) {
    req.user = User.find(user => user.id === userId)
  }
  next()
}