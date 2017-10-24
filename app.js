const fs = require('fs');
const parser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const morgan = require('morgan');

var file = fs.readFileSync('./TLibrary.json', 'utf-8')
var books = (JSON.parse(file))
var id = (JSON.parse(file).Books).length + 1;
app.get('/read', (req, res) => {
 console.log('Hello Logs!')
 console.log(id)
 console.log(books);
 res.send(books)
})

app.get('/update/:names/:descriptions/:authors', (req, res) => {
  let name = req.params.names
  let description = req.params.descriptions
  let author = req.params.authors
  console.log(name, description, author)
  const content = { "ID": id, "Name":name, "Borrowed": false, "Desc  ription": description, "Author": author }
  var file = books['Books'].push(content)
  fs.writeFileSync('./TLibrary.json', JSON.stringify(books)); 
  console.log(books)
  res.send(name);
})

app.get('/search/:id', (req, res) => {
  let id = req.params.id
  console.log(books.Books[id])
  res.send("Hola!");
  
})
app.use((err, req, res, next) => {
    const status = err.status || 500 
    res.status(status).json({ error: err })
})

app.use((req, res, next) => {
    res.status(404).json({ error: { message: 'Not found' }}) 
})
app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(parser.json());

const listener = () => console.log("I am here");
app.listen(port, listener);

