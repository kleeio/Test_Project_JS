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

/** Model instance for todoList and todoItem tables*/
const todoLists = sequelize_conn.define('todolists',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        listname: DataTypes.STRING
    },
    {
        timestamps: false,
        allowNull: false
    }
);
todoLists.removeAttribute('id');

const todoItems = sequelize_conn.define('todoitems',
    {
        itemid: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        listid: DataTypes.INTEGER,
        item: DataTypes.TEXT,
        completed: DataTypes.BOOLEAN
    },
    {
        timestamps: false,
        allowNull: false
    }
);
todoItems.removeAttribute('id');



app.get('/', (req, res) => {
    res.redirect('/todolists');
});


/**
 * POST: Create a TodoList
*/
app.post('/addNewList', function (req, res) {

    const dbName = req.query.listname;

    if (!dbName) {
        console.log("No list name provided.");

        res.status(411).send('Must provide a list name; no action taken.');
    }
    else {
        console.log("added new empty list: " + dbName);

        const addList = sequelize_conn.query(`INSERT INTO todolists (listname) VALUES ('${dbName}')`);

        res.send("added new empty list table: " + dbName);
    }
});

/**
 * GET: Get all of the TodoLists
 */
app.get('/getLists', function (req, res) {

    todoLists.findAll(
        {
            raw: true
        }
    ).then(temp => res.send(temp));
});

/**
 * POST: Create a TodoItem for a specific list
 */
app.post('/addToList', async function (req, res) {

    var listID = await todoLists.findOne(
        {
            attributes: ['id', 'listname'],
            where:
            {
                listname: req.query.listname
            }
        },
        {
            returning: false
        }
    );

    if (listID != null) {
        console.log(req.query.listname + " has id: " + listID.id);
    }
    else {
        console.log("list was not found");
    }

    sequelize_conn.query(`INSERT INTO todoItems (listid, item, completed) VALUES (${listID.id}, '${req.query.item}', false)`);

    res.send("added item: " + req.query.item + " into list: " + req.query.listname + " and automatically marked as incomplete");
});

/**
 * GET: Get all the TodoItem's in the TodoList
 */
app.get('/getItems', async function (req, res) {

    var listID = await todoLists.findOne(
        {
            attributes: ['id', 'listname'],
            where:
            {
                listname: req.query.listname
            }
        },
        {
            returning: false
        }
    );

    if (listID != null) {
        console.log(req.query.listname + " has list id: " + listID.id);
    }
    else {
        console.log("list was not found");
    }

    todoItems.findAll({
        attributes: ['item'],
        where: {
            listid: listID.id
        },
    }, {
        raw: true
    })
        .then(temp => res.send(temp));
});

/**
 * PUT: Update a TodoItem and mark it as done
 */
app.put("/updateItem", function (req, res) {

    console.log(req.query.listname + "\t" + req.query.item);

    const item = todoItems.update({
        completed: true
    }, {
        where: { item: req.query.item }
    }, {
        multi: false
    });

    res.send(req.query.task + " in " + req.query.listname + " has been marked as completed.");
});


/**
 * DELETE: Delete a TodoListItem
 */

app.delete("/deleteItem", function (req, res) {

    const item = todoItems.destroy({
        where: {
            item: req.query.item,
        }
    });

    res.send("Deleting entry: " + req.query.item);
});


/**
 * DELETE: Delete a TodoList
 */

app.delete("/deleteList", async function (req, res) {

    console.log("attempting to delete list: " + req.query.listname);

    var listID = await todoLists.findOne(
        {
            attributes: ['id', 'listname'],
            where:
            {
                listname: req.query.listname
            }
        },
        {
            returning: false
        }
    );

    if (listID != null) {
        console.log(req.query.listname + " has id: " + listID.id);
    }
    else {
        console.log("list was not found");
    }

    const item = todoItems.destroy({
        where: {
            listid: listID.id,
            // task: req.query.task,
            // completed: req.query.completed
        }
    });

    res.send("Deleting entry: " + req.query.listname);
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}..`));
