// to import express and body-parser
const express = require("express");
const bodyParser = require("body-parser");
const books = require("./books.json");

const app = express();// initializing the express app
app.use(bodyParser.json());//This enables the app to parse JSON data in the body of incoming requests and make it accessible via req.body.

// Helper function to filter books
function filterBooks(query) {
    const { author, language, genre, title } = query;
  
    return books.filter((book) => {
      // Check each criterion only if it's provided
      const matchesAuthor = !author || book.author.toLowerCase().includes(author.toLowerCase());
      const matchesLanguage = !language || book.language.toLowerCase() === language.toLowerCase();
      const matchesGenre = !genre || book.genre.toLowerCase().includes(genre.toLowerCase());
      const matchesTitle = !title || book.title.toLowerCase().includes(title.toLowerCase());
  
      // Return true only if all provided criteria match
      return matchesAuthor && matchesLanguage && matchesGenre && matchesTitle;
    });
  }
  
// API Endpoint: Get book recommendations
app.get("/recommendations", (req, res) => {
  const query = req.query;

  // Filter books based on the query parameters
  const recommendations = filterBooks(query);

  if (recommendations.length === 0) {
    return res.status(404).json({ message: "No books found matching your criteria." });
  }

  res.json(recommendations);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
