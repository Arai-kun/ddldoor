let express = require('express');
let dbRouter = express.Router();
let User = require('../models/user');
let Member = require('../models/member');
let Card = require('../models/card');
let Log = require('../models/log');
let bcrypt = require('bcrypt');
const saltRounds = 10;

/* POST db/user */
dbRouter.post('/user', (req, res, next) => {
  bcrypt.hash(req.body['password'], saltRounds, (error, hash) => {
      if(error) next(error);
      req.body['password'] = hash;
      User.create(req.body, error => {
          if(error) next(error);
          res.json({result: 'success'});
      });
  });
});

/* POST db/user/exist */
dbRouter.post('/user/exist', (req, res, next) => {
  User.findOne({email: req.body['email']}, (error, user) => {
      if(error) next(error);
      if(!user){
          res.json(false);
      }
      else{
          res.json(true);
      }
  });
});

/* GET db/members/:id */
dbRouter.get('/member/:id', (req, res, next) => {
  Member.findOne({id: req.params.id}, (error, member) => {
      if(error) next(error);
      res.json(member);
  })
})

/* GET db/members */
dbRouter.get('/members', (req, res, next) => {
  Member.find({}, (error, members) => {
    if(error) next(error);
    res.json(members);
  });
});

/* POST db/member */
dbRouter.post('/member', (req, res, next) => {
  Member.create(req.body, error => {
    if(error) next(error);
    res.json(true);
  });
});

/* PUT db/member */
dbRouter.put('/member', (req, res, next) => {
  Member.updateOne({id: req.body.id}, req.body, error => {
      if(error) next(error);
      res.json(true);
  });
});

/* GET db/card/:idm */
dbRouter.get('/card/:idm', (req, res, next) => {
  Card.findOne({idm: req.params.idm}, (error, card) => {
      if(error) next(error);
      res.json(card);
  })
});

/* GET db/cards */
dbRouter.get('/cards', (req, res, next) => {
  Card.find({}, (error, cards) => {
    if(error) next(error);
    res.json(cards);
  });
});

/**
 * TODO:
 * Prohibit the duplicated idm!
 * Make the process in server or client
 */

/* POST db/card */
dbRouter.post('/card', (req, res, next) => {
  Card.create(req.body, error => {
    if(error) next(error);
    res.json(true);
  });
});

/* PUT db/card */
dbRouter.put('/card', (req, res, next) => {
  Card.updateOne({idm: req.body.idm}, req.body, error => {
      if(error) next(error);
      res.json(true);
  });
});

/* GET db/logs */
dbRouter.get('/logs', (req, res, next) => {
  Log.find({}, (error, logs) => {
    if(error) next(error);
    res.json(logs);
  });
});

module.exports = dbRouter;
