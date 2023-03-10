Just notes on how the database table "todolists" is created.
As well as some Postgres controls to view tables and to show table;

CREATE TABLE todoLists(
    id SERIAL PRIMARY KEY NOT NULL,
    listname varchar(32) NOT NULL
);

CREATE TABLE todoItems(
    itemID SERIAL PRIMARY KEY NOT NULL,
    listID INTEGER NOT NULL,
    item TEXT NOT NULL,
    completed BOOLEAN NOT NULL
);

INSERT into todolists (listname) VALUES ('reading');






CREATE TABLE [IF NOT EXISTS] ($1) (
    listname VARCHAR(32) NOT NULL,
    task TEXT,
    completed BOOLEAN
);

DELETE FROM todolists WHERE listname = 'apple' AND task = 'banana' AND completed = true;


DB CONTROLS
list all tables in db
\list;

show table
\dt+;


//WITH COMPOSITE TYPE of TODOITEM; possible extension

CREATE TABLE[IF NOT EXISTS] TDLIST(
    listname VARCHAR(32),
    task todoItem[]
)

CREATE TYPE todoItem AS (
    task TEXT,
    completed BOOLEAN
);

insert into todolists(listname, tasks) values(
    'groceries',
    ARRAY [('apples', false)::todoitem]
    );