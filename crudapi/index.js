const express = require('express')
const bcrypt = require("bcryptjs");
const PORT = process.env.PORT || 8080
require('./database/config')
const User = require('./database/user')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/register', async (req, res) => {
  try {
    const { name, password } = req.body
    if (!name  || !password ) {
      res.send({ message: "Plz fill Ful details" })
    }
    let user_data = new User(req.body)
    let result = await user_data.save()
    result = result.toObject()
    if (result) {
      let myToken = await user_data.getAuthToken()
      if (myToken) {
        res.send({
          result,
          message: "Token Was Generated Successfully",
          token: myToken
        })
      } else {
        res.send({ message: "Token was not generated" })
      }
    } else {
      res.send({ message: "User was not Found" })
    }
  } catch (error) {
    res.send({
      message: "Server Error"
    })
  }
})


app.post('/login', async (req, res) => {
  try {
    const {  password,name } = req.body
    if ( !name || !password ) {
      res.send({ message: "Plz fill Ful details" })
    }
    let user = await User.findOne({ name: name })
    if (user) {
      let validPassword = await bcrypt.compare(password, user.password)
      if (validPassword) {
          res.send({
            user,
            message: "Login was successfully",
          })
      } else {
        res.send({ message: "Not a valid Password" })
      }
    } else {
      res.send({ message: "User Was not found" })
    }
  } catch (error) {
    res.send({
      message: 'catch error was runing now'
    })
  }
})

app.get('/user', async (req, res) => {
  try {
    const student = await User.find()
    res.send({ student, message: "Data get Successfully", status: (200) })
  } catch (error) {
    res.status(400).send({ error: "No Record Found" })
  }
})

app.delete('/user/:id', async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
      res.send({ message: 'Record deleted successfully' });
    } else {
      res.status(404).send({ error: 'Record not found' });
    }
  } catch (error) {
    console.error('Error deleting data:', error.message);
    res.status(500).send({ error: 'Server Error' });
  }
});

app.get('/user/:id', async (req, res) => {
  const result = await User.findOne({ _id: req.params.id })
  if (result) {
    res.send(result)
  } else {
    res.send('undefind')
  }
})


app.put('/user/:id', async (req, res) => {
  const result = await User.updateOne({ _id: req.params.id }, { $set: req.body })
  res.send(result)
})

app.get('/search/:searchKey', async (req, res) => {
  try {
    const searchKey = req.params.searchKey;
    const result = await User.find({
      $or: [
        { name: { $regex: searchKey, $options: 'i' } }, 
        { password: { $regex: searchKey, $options: 'i' } } 
      ]
    });
    res.send(result);
  } catch (error) {
    console.error('Error searching data:', error.message);
    res.status(500).send({ error: 'Server Error' });
  }
});




app.listen(PORT, () => {
  console.log('server started')
})