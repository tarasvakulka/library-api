var express = require("express"),
    http = require("http"),
    cors = require("cors"),
    BooksController = require("./controllers/BooksController.js"),
    AuthorsController = require("./controllers/AuthorsController.js"),
    app = express(),
    bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.json());

http.createServer(app).listen(process.env.PORT || 8080);
console.log("Server start");
app.get("/books.json", BooksController.load);
app.post("/books", BooksController.create);
app.delete("/book", BooksController.destroy);

app.get("/authors.json", AuthorsController.load);
app.post("/authors", AuthorsController.create);
app.delete("/author", AuthorsController.destroy);