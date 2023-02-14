/**
 * TODO List Project
 * @author Clay Lee
 * @version 1.0.0
 * */

const { Sequelize, DataTypes, Model } = require('sequelize');
const express = require('express');
const app = express();
// requested body text to json obj
const parser = require("body-parser");
// server listening on
const PORT = 5431;
//for DB connection, query, and update
const { Client } = require("pg");
const DBPORT = 5432;

app.use(parser.json());

/**
 * Database Connection
 */
// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: 'postgres'
// });


const sequelize_conn = new Sequelize('postgres://clay:@localhost:5432/postgres');

try {
    sequelize_conn.authenticate();
    console.log(`Connection has been established successfully on port ${DBPORT}.`);
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const User = sequelize_conn.define('todolists',
    {
        listname: DataTypes.TEXT,
        task: DataTypes.TEXT,
        completed: DataTypes.BOOLEAN,
    },
    {
        timestamps: false,
        allowNull: false
    }
);

User.removeAttribute('id');



// const temp = User.create({ listname: "school", task: "books", completed: false });



/**
 * POST: Create a TodoList
 */


/**
 * GET: Get all of the TodoLists
 */
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/todolists', function (req, res) {
    User.findAll({ raw: true }).then(temp => res.send(temp));
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

// client.end()
