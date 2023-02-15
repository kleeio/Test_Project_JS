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

const sequelize_conn = new Sequelize('postgres://clay:@localhost:5432/postgres');

try {
    sequelize_conn.authenticate();
    console.log(`Connection has been established successfully on port ${DBPORT}.`);
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


/** Model for each todoItem object, represented as three attributes in a row, within the todolists table */
const User = sequelize_conn.define('todolists',
    {
        listname: DataTypes.TEXT,
        task: DataTypes.TEXT,
        completed: DataTypes.BOOLEAN,
    },
    {
        timestamps: false,
        // allowNull: false
    }
);
// removes preset ID from Sequelize
User.removeAttribute('id');
// console.log(User);




// const temp = User.create({ listname: "school", task: "books", completed: false });
app.get('/', (req, res) => {
    res.redirect('/todolists');
});


/**
 * POST: Create a TodoList
*/
app.post('/addNewList', function (req, res) {
    if (!req.query.listname) {
        console.log("No list name provided.");
        res.status(411).send('Must provide a list name; no action taken.');
    }
    else {
        console.log("added new empty list: " + req.query.listname);// + "\t| task: " + req.query.task + "\t| completed? : " + req.query.completed);

        User.create({
            listname: req.query.listname,
            task: req.query.task,
            completed: req.query.completed
        });

        res.send("added new empty list: " + req.query.listname);// + "\t| task: " + req.query.task + "\t| completed? : " + req.query.completed);
    }
    // var newListName = req.query.listname;
    // var list = sequelize_conn.query(`CREATE TABLE IF NOT EXISTS ${newListName} ( listname VARCHAR(32) NOT NULL, task TEXT, completed BOOLEAN);`, req.query.listname);
});

/**
 * GET: Get all of the TodoLists
 */

// grouping option removes duplicate todoItems at response; does not remove entries in DB
app.get('/getLists', function (req, res) {
    // var all = "\dt;"
    // var result = sequelize_conn.query(`${all}`);
    // console.log(result);
    // all.findAll({ raw: true }).then(temp => res.send(temp));
    User.findAll({
        group: ['listname', 'task', 'completed']
    }, {
        raw: true
    }).then(temp => res.send(temp));
});

/**
 * POST: Create a TodoItem for a specific list
 */
app.post('/addToList', function (req, res) {
    console.log(req.query.listname);

    var temp = User.create({
        listname: req.query.listname,
        task: req.query.task, completed:
            req.query.completed
    });

    res.send("adding to list: " + req.query.listname + "\t|| task: " + req.query.task + "\t|| completed? : " + req.query.completed);
});

/**
 * GET: Get all the TodoItem's in the TodoList
 */
app.get('/getItems', function (req, res) {
    console.log(req.query.listname);
    User.findAll({
        where: {
            listname: req.query.listname
        },
    }, {
        group: ['listname', 'task', 'completed']
    }, {
        raw: true
    })
        .then(temp => res.send(temp));
    // var all = "\dt;"
    // var result = sequelize_conn.query(`${all}`);
    // console.log(result);
    // all.findAll({ raw: true }).then(temp => res.send(temp));
});

/**
 * PUT: Update a TodoItem and mark it as done
 */
app.put("/updateTask", function (req, res) {
    console.log(req.query.listname + "\t" + req.query.task);

    const item = User.update({
        completed: true
    }, {
        where: { task: req.query.task }
    }, {
        multi: false
    });

    res.send(req.query.task + " in " + req.query.listname + " has been marked as completed.");
});


/**
 * DELETE: Delete a TodoListItem
 */

/**
 * DELETE: Delete a TodoList
 */


app.listen(PORT, () => console.log(`Listening on port ${PORT}..`));
