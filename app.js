const express = require('express');
const itemRoutes = require('./itemsRoute')
const app = express();

app.use(express.json());

app.use('/items', itemRoutes)

app.listen(3000, () => {
    console.log("App on port 3000")
})
