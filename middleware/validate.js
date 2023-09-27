const validator = require('../helpers/validate');

const saveMonster = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    ac: 'required|integer',
    hp: 'required|integer',
    Speed: 'required|string',
    STR: 'required|integer',
    DEX: 'required|integer',
    CON: 'required|integer',
    INT: 'required|integer',
    WIS: 'required|integer',
    CHA: 'required|integer',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const savePlayer = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    ac: 'required|integer',
    hp: 'required|integer'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveMonster,
  savePlayer
};
