const express = require('express');
const moviesRouter = require('./routers/movies-router');

const server = express();
const port = process.env.PORT || 4000;

server.use('/movies', moviesRouter);

server.listen(port, () => console.log(`Listening on port ${port}`));
