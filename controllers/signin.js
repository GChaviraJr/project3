const db = require("../models/");
const jwt = require('jsonwebtoken');

// You will want to update your host to the proper address in production
const redisClient = require('redis').createClient(process.env.REDIS_URL || 'redis://redis');

const signToken = (username) => {
  const jwtPayload = { username };
  return jwt.sign(jwtPayload, 'JWT_SECRET_KEY', { expiresIn: '2 days'});
};

const setToken = (key, value) => Promise.resolve(redisClient.set(key, value));

const createSession = (user) => {
  const { email, id } = user;
  const token = signToken(email);
  return setToken(token, id)
    .then(() => {
      return { success: 'true', userId: id, token, user }
    })
    .catch(console.log);
};

const handleSignin = (bcrypt, req, res) => {
  const { email, password } = req.body;
  console.log("handlesignin after destructering")
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  return db.Login.findOne({email})
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.Users.findOne({email})
          .then(user => user[0])
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        return Promise.reject('wrong credentials');
      }
    })
    .catch(err => err)
}

const handleSignin2 = async (bcrypt, req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }

  console.log("start of return of handlesignin2")
    const login = await db.Login.findOne({ email })
    const isValid = bcrypt.compareSync(password, login.hash);
    const userEmail = await db.Users.findOne({ email })
    console.log('right before return')
  return db.Login.find({email})
    .then( login => {
      if (isValid) {
        console.log("if statement isValid")
        return userEmail
          .then(user => user)
          .catch(err => res.status(400).json('unable to get user first catch of handlesignin2'))
      } else {
        return Promise.reject('wrong credentials, last return of handlesignin2');
      }
    })
    .catch(err => err)
}

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).send('Unauthorized');
    }
    console.log("completed getAuthTokenId")
    return res.json({id: reply})
  });
}

const signinAuthentication = (bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  console.log("before getAuthTokenID");
  return authorization ? getAuthTokenId(req, res)
    : handleSignin2(bcrypt, req, res)
    .then(data =>
      data._id && data.email ? createSession(data) : Promise.reject(data))
    .then(session => res.json(session))
    .catch(err => res.status(400).json(err));
}

module.exports = {
  signinAuthentication: signinAuthentication,
  redisClient: redisClient
}