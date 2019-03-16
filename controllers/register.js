const loginController = require('./loginController')
const userController = require('./userController')

const handleRegister = (req, db, res, bcrypt) => {
  const { email, name, password } = req.body;
  
  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  }

  const hash = bcrypt.hashSync(password);

    loginController.create({
      hash: hash,
      email: email 
    }).then( ({email}) => {
      return userController.create({
        email: email,
        name: name
      }).then(user => {
        res.json(user);
      }).catch(err => res.status(400).json('unable to register'))
    }).catch(err => res.status(400).json('unable to register'))
}

module.exports = {
  handleRegister: handleRegister
};


