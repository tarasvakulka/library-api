var BooksController = {},
    fs = require("fs");

BooksController.books = JSON.parse(fs.readFileSync("./books.json", "utf-8"));
BooksController.authors = JSON.parse(fs.readFileSync("./authors.json", "utf-8"));

BooksController.load = function(req, res) {
    res.json(BooksController.books);
} 
BooksController.create = function(req, res) {
    function idGenerator(items) {
        var idItems = items.map(function(item) {
            return parseInt(item.id);
        });
        var maxId = Math.max.apply(null, idItems);
        return maxId + 1;
    }
    var newBook = {
        id: idGenerator(BooksController.books),
        name: req.body.name,
        authors: req.body.authors,
        genre: req.body.genre,
        description: req.body.description 
    };
    BooksController.books.push(newBook);
    var file = JSON.stringify(BooksController.books);
    fs.writeFileSync("./books.json",  file);

}
BooksController.destroy = function(req,res) {
    BooksController.books.pop();
    fs.writeFileSync("./books.json",  BooksController.books);
}
module.exports = BooksController;
