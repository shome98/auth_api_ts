import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Your express application configuration
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Listen on the specified port; note that Vercel provides a port automatically
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});

export default app;