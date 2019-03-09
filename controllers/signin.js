const db = require("../models/");
const jwt = require('jsonwebtoken');

// You will want to update your host to the proper address in production
const redisClient = require('redis').createClient(process.env.REDIS_URL);

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
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  return db.Login.find({email, hash})
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.Users.find({email})
          .then(user => user[0])
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        return Promise.reject('wrong credentials');
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
    return res.json({id: reply})
  });
}

const signinAuthentication = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  return authorization ? getAuthTokenId(req, res)
    : handleSignin(db, bcrypt, req, res)
    .then(data =>
      data.id && data.email ? createSession(data) : Promise.reject(data))
    .then(session => res.json(session))
    .catch(err => res.status(400).json(err));
}

module.exports = {
  signinAuthentication: signinAuthentication,
  redisClient: redisClient
}