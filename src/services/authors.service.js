const authors = require("../models/authors.model");

class AuthorService {
  getAll(query) {
    let results = authors;

    // search by name or country
    if (query.search) {
      results = results.filter(a =>
        a.name.toLowerCase().includes(query.search.toLowerCase()) ||
        a.country.toLowerCase().includes(query.search.toLowerCase())
      );
    }

    // filter age (min)
    if (query.min_age) {
      results = results.filter(a => a.age >= Number(query.min_age));
    }

    return results;
  }

  getById(id) {
    return authors.find(a => a.id === Number(id));
  }

  create(data) {
    const newAuthor = {
      id: authors.length + 1,
      ...data,
    };

    authors.push(newAuthor);
    return newAuthor;
  }

  update(id, data) {
    const index = authors.findIndex(a => a.id === Number(id));
    if (index === -1) return null;

    authors[index] = { ...authors[index], ...data };
    return authors[index];
  }

  delete(id) {
    const index = authors.findIndex(a => a.id === Number(id));
    if (index === -1) return false;

    authors.splice(index, 1);
    return true;
  }
}

module.exports = new AuthorService();
