import api from "./api";

export default {

  // GET /books/all
  getAllBooks() {
    return api.get("/books/all");
  },

  // GET /books/search/:id
  getBook(id) {
    return api.get(`/books/search/${id}`);
  },

  // POST /books/new
  createBook(book) {
    return api.post("/books/new", book);
  },

  // PUT /books/edit/:id
  updateBook(id, book) {
    return api.put(`/books/edit/${id}`, book);
  },

  // DELETE
  deleteBook(id) {
    return api.delete(`/books/delete/${id}`);
  },

};