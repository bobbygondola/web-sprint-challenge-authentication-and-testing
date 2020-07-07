const router = require('express').Router();
const db = require('../users/users-helpers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/users', (req,res) => {
  db.getAll()
  .then(users => {
    res.status(200).json(users)
  })
})

//auth/register
router.post('/register', (req,res) => {
  const { username, password } = req.body;
  //hash
  const rounds = 8;
  const hash = bcrypt.hashSync(password, rounds)
  //function
  db.addUser({username, password:hash})
  .then(user => {
      res.status(201).json(user)
  })
})

//auth/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (req.body) {
    db.findBy({ username: username })
      .then(([user]) => {
        console.log("USERRRR", user);
        // compare the password the hash stored in the database
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = createToken(user);
          req.session.user = user;
          res.status(200).json({ message: `Welcome ${user.username}.. Welcome to my server.. Here is a token that we made with JWT`,
           token,
           session: req.session, });
           
        } else {
          res.status(400).json({ message: "Invalid credentials" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "Please Provide An Entry",
    });
  }
});

function createToken(user){
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };
  const secret = process.env.JWT_SECRET || 'secret baby'
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, secret, options)
}

//logout
router.delete('/logout', (req,res) => {
  if (req.session){
      req.session.destroy(error => {
          if(error){
              res.status(500).json({message: "cant log out"});
          } else {
              res.status(204).end();
          }
      })
  } else {
      res.status(204).end();
  }
})

module.exports = router;
