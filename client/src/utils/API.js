import axios from "axios";

export default {
  // Gets all books
  getTours: function () {
    return axios.get("/api/tours");
  },
  // Deletes the book with the given id
  deleteTour: function (id) {
    return axios.delete("/api/tours/" + id);
  },
  // Saves a book to the database
  saveTour: function (tourData) {
    return axios.post("/api/tours", tourData);
  },
  // Gets the book with the given id
  getTour: function (id) {
    return axios.get("/api/tours/" + id);
  },
  patchTour: function (id, tourData) {
    return axios.patch("/api/tours/" + id, tourData);
  },
};
