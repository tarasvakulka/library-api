var AuthorsController = {},
    fs = require("fs");

AuthorsController.books = JSON.parse(fs.readFileSync("./books.json", "utf-8"));
AuthorsController.authors = JSON.parse(fs.readFileSync("./authors.json", "utf-8"));

AuthorsController.load = function(req, res) {
    res.json(AuthorsController.authors);
}
AuthorsController.create = function(req, res) {
    function idGenerator(items) {
        var idItems = items.map(function(item) {
            return parseInt(item.id);
        });
        var maxId = Math.max.apply(null, idItems);
        return maxId + 1;
    }
    var newAuthor = {
        id: idGenerator(AuthorsController.authors),
        name: req.body.name,
        biography: req.body.biography,
        books: req.body.books
    };
    AuthorsController.authors.push(newAuthor);
    fs.writeFileSync("./authors.json",  JSON.stringify(AuthorsController.authors));

}
AuthorsController.destroy = function(req,res) {
    AuthorsController.authors.pop();
    fs.writeFileSync("./authors.json",  AuthorsController.authors);
}
module.exports = AuthorsController;