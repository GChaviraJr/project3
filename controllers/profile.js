const db = require("../models/");

const handleProfileGet = (req, res) => {
  const { _id } = req.params;
  db.Users.findById({_id})
    .then(user => {
      if (user) {
        console.log('if statement handleprofileget')
        res.json(user[0])
      } else {
        res.status(400).json('Credentials not found getting')
      }
    })
    .catch(err => res.status(400).json('error getting credentials'))
}

const handleProfileUpdate = (req, res) => {
  const { _id } = req.params;
  const { name, age, pet } = req.body.formInput;
  db.Users.findByIdAndUpdate( _id, { name })
  .then(resp => {
    if (resp) {
      console.log('handleprofileupdate')
      res.json("success")
    } else {
      res.status(400).json('Credentials not found updating')
    }
  })
  .catch(err => res.status(400).json('error updating user'))
}

module.exports = {
  handleProfileGet,
  handleProfileUpdate
}