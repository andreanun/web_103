import express from "express";

// Initialize the Express app
const app = express();

// middleware function to serve static files from the public directory.
app.use("/public", express.static("./public"));

// middleware function to serve static files from the scripts directory.
app.use("/scripts", express.static("./public/scripts"));

// define a route for the root URL of server
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      '<h1 style="text-align: center; margin-top: 50px;">UnEarthed API</h1>',
    );
});

// start server on port
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
