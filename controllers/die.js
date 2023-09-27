const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  //#swagger.tags=['Die']
  mongodb
    .getDb()
    .db()
    .collection('die')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = (req, res) => {
  //#swagger.tags=['Die']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid dice id to find a dice.');
  }
  const diceId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('die')
    .find({ _id: diceId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createDice = async (req, res) => {
  //#swagger.tags=['Die']
  const dice = {
    sides: req.body.sides
  };
  const response = await mongodb.getDb().db().collection('die').insertOne(dice);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the dice.');
  }
};

const updateDice = async (req, res) => {
  //#swagger.tags=['Die']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid dice id to update a dice.');
  }
  const diceId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const dice = {
    sides: req.body.sides
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('die')
    .replaceOne({ _id: diceId }, dice);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the dice.');
  }
};

const deleteDice = async (req, res) => {
  //#swagger.tags=['Die']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid dice id to delete a dice.');
  }
  const diceId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('die').remove({ _id: diceId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the dice.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createDice,
  updateDice,
  deleteDice
};
