const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const db = require('./data/db-config')
// const plantRouter = require("./api/plants/plants-router");
// const authRouter = require("./api/auth/auth-router");
// const userRouter = require("./api/users/users-router");

function getAllUsers() { return db('users') }
function getAllPlants() { return db('plants') }

async function insertUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
  const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
  return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
}

async function insertPlants(plants) {
    const [newPlantObject] = await db('plants').insert(plants, ['plants_id', 'nickname', 'species', 'h2o_frequency', 'image'])
    return newPlantObject
  }

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.get('/api/users', async (req, res) => {
  res.json(await getAllUsers())
})

server.post('/api/users', async (req, res) => {
  res.status(201).json(await insertUser(req.body))
})

server.get('/api/plants', async (req, res) => {
  res.json(await getAllPlants())
})
  
server.post('/api/plants', async (req, res) => {
  res.status(201).json(await insertPlants(req.body))
})

// server.use("/api/plants", plantRouter);
// server.use("/api/auth", authRouter);
// server.use("/api/users", userRouter);

module.exports = server
