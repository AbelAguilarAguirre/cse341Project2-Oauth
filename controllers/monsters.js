const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  //#swagger.tags=['Monster']
  mongodb
    .getDb()
    .db()
    .collection('monsters')
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
  //#swagger.tags=['Monster']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid monster id to find a monster.');
  }
  const monsterId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('monsters')
    .find({ _id: monsterId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createMonster = async (req, res) => {
  //#swagger.tags=['Monster']
  const monster = {
    name: req.body.name,
    ac: req.body.ac,
    hp: req.body.hp,
    Speed: req.body.Speed,
    STR: req.body.STR,
    DEX: req.body.DEX,
    CON: req.body.CON,
    INT: req.body.INT,
    WIS: req.body.WIS,
    CHA: req.body.CHA
  };
  const response = await mongodb.getDb().db().collection('monsters').insertOne(monster);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the monster.');
  }
};

const updateMonster = async (req, res) => {
  //#swagger.tags=['Monster']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid monster id to update a monster.');
  }
  const monsterId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const monster = {
    name: req.body.name,
    ac: req.body.ac,
    hp: req.body.hp,
    Speed: req.body.Speed,
    STR: req.body.STR,
    DEX: req.body.DEX,
    CON: req.body.CON,
    INT: req.body.INT,
    WIS: req.body.WIS,
    CHA: req.body.CHA
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('monsters')
    .replaceOne({ _id: monsterId }, monster);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the monster.');
  }
};

const deleteMonster = async (req, res) => {
  //#swagger.tags=['Monster']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid monster id to delete a monster.');
  }
  const monsterId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('monsters').remove({ _id: monsterId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the monster.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createMonster,
  updateMonster,
  deleteMonster
};
