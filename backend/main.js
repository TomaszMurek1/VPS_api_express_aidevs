import express from 'express';
import bodyParser from 'body-parser';
import apiOwnRoute from './routes/apiown.js';

const app = express();
const port = 3000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Use your OpenAI routes
app.use('/apiown', apiOwnRoute);

// Handle 404 Not Found
app.use((req, res, next) => {
  res.status(404).send({ error: 'Not Found2' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
