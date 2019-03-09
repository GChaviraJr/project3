const db = require("../models/");

const handleProfileGet = (req, res) => {
  const { id } = req.params;
  db.Users.findById(id, (err) => {})
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
}

const handleProfileUpdate = (req, res) => {
  const { id } = req.params;
  const { name, age, pet } = req.body.formInput;
  db.Users.findByIdAndUpdate( id, { name }, (err) => {})
  .then(resp => {
    if (resp) {
      res.json("success")
    } else {
      res.status(400).json('Not found')
    }
  })
  .catch(err => res.status(400).json('error updating user'))
}

module.exports = {
  handleProfileGet,
  handleProfileUpdate
}