const app = require('express').Router();
const {readFromFile, writeToFile, readAndAppend} = require('../../helpers/fsUtil');
const uniqid = require('uniqid');
const fs = require('fs');

// puts db data onto notes html
app.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})
// adds the notes to db
app.post('/notes', (req, res) => {
    console.log(`${req.method} request!`);
    const {title, text} = req.body;
    if (req.body) {
        const addNote = {
            title,
            text,
            id: uniqid()
    };

    readAndAppend(addNote,'./db/db.json');
    res.json(`Note added!`);
    } else {
    res.error('Error!');
    }
})
// DELETE from db
app.delete('/notes/:id', (req, res) => {
    console.log(`${req.method} request!`);

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
    let myArr = JSON.parse(data)
    const deleteID = req.params.id
    const deleteData = myArr.filter(data => data.id !== deleteID)
    
    writeToFile('./db/db.json', deleteData )
    res.json(`Deleted!`)
    })
})


module.exports = app;