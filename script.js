/**
 * TODO List Project
 * @author Clay Lee
 * @version 1.0.0
 * */

const { Sequelize } = require('sequelize');
//for DB connection and querying
const { Client } = require("pg");
const express = require('express');
const app = express();
const PORT = 5431;
const DBPORT = 5432;

/**
 * Database Connection
 */
// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: 'postgres'
// });

// const client = new Client({
//     user: 'clay',
//     host: 'localhost',
//     database: 'postgres',
//     password: '',
//     port: PORT,
// })
// client.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

// client.query('SELECT * FROM todolists', (err, res) => {
//     console.log(err, res)
//     client.end()
// })



/**
 * POST: Create a TodoList
 */


/**
 * GET: Get all of the TodoLists
 */
app.get('/', (req, res) => {
    res.send('Hello World');
});

/**
 * POST: Create a TodoItem for a specific list
 */

/**
 * GET: Get all the TodoItem's in the TodoList
 */

/**
 * PUT:  Update a TodoItem and mark it as done
 */

/**
 * DELETE: Delete a TodoListItem
 */

/**
 * DELETE: Delete a TodoList
 */


app.listen(PORT, () => console.log(`Listening on port ${PORT}..`));