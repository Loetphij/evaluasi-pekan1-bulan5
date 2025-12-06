const books = require("../models/books.model");
const authors = require("../models/authors.model");

class BookService {
  getAll(query) {
    let results = [...books];

    // SEARCH title / author
    if (query.search) {
      const s = query.search.toLowerCase();

      results = results.filter(b => {
        const author = authors.find(a => a.id === b.author_id) || { name: "" };
        return (
          b.title.toLowerCase().includes(s) ||
          author.name.toLowerCase().includes(s)
        );
      });
    }

    // FILTER min_year
    if (query.min_year) {
      results = results.filter(b => b.tahun >= Number(query.min_year));
    }

    // JOIN + FORMAT OUTPUT
    return results.map(b => {
      const author = authors.find(a => a.id === b.author_id) || {
        id: null,
        name: "Unknown",
      };

      return {
        id: b.id,
        title: b.title,
        year: b.tahun, // ← ini dari model "tahun"
        author: {
          id: author.id,
          name: author.name,
        },
      };
    });
  }

  getById(id) {
    const book = books.find(b => b.id === Number(id));
    if (!book) return null;

    const author = authors.find(a => a.id === book.author_id) || {
      id: null,
      name: "Unknown",
    };

    return {
      id: book.id,
      title: book.title,
      year: book.tahun, // tetap convert ke "year"
      author: {
        id: author.id,
        name: author.id
      },
    };
  }

  create(data) {
    const newBook = {
      id: books.length + 1,
      title: data.title,
      tahun: Number(data.year), // ← user kirim "year", model simpan "tahun"
      author_id: Number(data.author_id),
    };

    books.push(newBook);

    const author = authors.find(a => a.id === newBook.author_id) || {
      id: null,
      name: "Unknown",
    };

    return {
      id: newBook.id,
      title: newBook.title,
      year: newBook.tahun,
      author: {
        id: author.id,
        name: author.name,
      },
    };
  }

  update(id, data) {
    const index = books.findIndex(b => b.id === Number(id));
    if (index === -1) return null;

    books[index] = {
      ...books[index],
      title: data.title ?? books[index].title,
      tahun: data.year ? Number(data.year) : books[index].tahun,
      author_id: data.author_id
        ? Number(data.author_id)
        : books[index].author_id,
    };

    const author = authors.find(a => a.id === books[index].author_id) || {
      id: null,
      name: "Unknown",
    };

    return {
      id: books[index].id,
      title: books[index].title,
      year: books[index].tahun,
      author: {
        id: author.id,
        name: author.name
      },
    };
  }

  delete(id) {
    const index = books.findIndex(b => b.id === Number(id));
    if (index === -1) return false;

    books.splice(index, 1);
    return true;
  }
}

module.exports = new BookService();
