import api from "./api";

export default {

  getAllAuthors() {
    return api.get("/author/all");
  },

  addAuthor(author) {
    return api.post("/author/add", author);
  },

};