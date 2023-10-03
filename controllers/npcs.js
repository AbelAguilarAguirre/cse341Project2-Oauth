const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  //#swagger.tags=['Npc']
  mongodb
    .getDb()
    .db()
    .collection('npcs')
    .find()
    .toArray((err, lists) => {
      try {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      } catch (err) {
        res.status(500).json({ message: err });
      }
    });
};

const getSingle = (req, res) => {
  //#swagger.tags=['Npc']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid npc id to find a npc.');
  }
  const npcId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('npcs')
    .find({ _id: npcId })
    .toArray((err, result) => {
      try {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      } catch (err) {
        res.status(400).json({ message: err });
      }
    });
};

const createNpc = async (req, res) => {
  //#swagger.tags=['Npc']
  const npc = {
    name: req.body.name,
    job: req.body.job
  };
  const response = await mongodb.getDb().db().collection('npcs').insertOne(npc);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the npc.');
  }
};

const updateNpc = async (req, res) => {
  //#swagger.tags=['Npc']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid npc id to update a npc.');
  }
  const npcId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const npc = {
    name: req.body.name,
    job: req.body.job
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('npcs')
    .replaceOne({ _id: npcId }, npc);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the npc.');
  }
};

const deleteNpc = async (req, res) => {
  //#swagger.tags=['Npc']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid npc id to delete a npc.');
  }
  const npcId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('npcs').remove({ _id: npcId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the npc.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createNpc,
  updateNpc,
  deleteNpc
};
