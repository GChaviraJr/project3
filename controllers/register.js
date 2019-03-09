const loginController = require('../controllers/loginController')
const userController = require('../controllers/userController')

const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  }

  const hash = bcrypt.hashSync(password);

    loginController.create({
      hash: hash,
      email: email 
    }).then(loginEmail => {
      return userController.create({
        email: loginEmail[0],
        name: name
      }).then(user => {
        res.json("user[0]");
      }).catch(err => res.status(400).json('unable to register'))
    }).catch(err => res.status(400).json('unable to register'))
}

module.exports = {
  handleRegister: handleRegister
};


