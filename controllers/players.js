const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  //#swagger.tags=['Player']
  mongodb
    .getDb()
    .db()
    .collection('players')
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
  //#swagger.tags=['Player']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid player id to find a player.');
  }
  const playerId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('players')
    .find({ _id: playerId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createPlayer = async (req, res) => {
  //#swagger.tags=['Player']
  const player = {
    name: req.body.name,
    ac: req.body.ac,
    hp: req.body.hp
  };
  const response = await mongodb.getDb().db().collection('players').insertOne(player);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the player.');
  }
};

const updatePlayer = async (req, res) => {
  //#swagger.tags=['Player']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid player id to update a player.');
  }
  const playerId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const player = {
    name: req.body.name,
    ac: req.body.ac,
    hp: req.body.hp
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('players')
    .replaceOne({ _id: playerId }, player);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the player.');
  }
};

const deletePlayer = async (req, res) => {
  //#swagger.tags=['Player']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid player id to delete a player.');
  }
  const playerId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('players').remove({ _id: playerId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the player.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createPlayer,
  updatePlayer,
  deletePlayer
};
