require('dotenv').config();
const express = require('express');
const massive = require('massive');
// const { create, getAll, getOne, update, delete } = './products_controller'

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

app.use(express.json());

massive({ 
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
}}).then(dbInstance => {
    app.set('db', dbInstance);
}).catch((e) => console.log('db connection problem', e));

//endpoints
app.post('/api/products', products_controller.create);
app.get('/api/products', products_controller.getAll);
app.get('/api/products/:id', products_controller.getOne);
app.put('/api/products/:id', products_controller.update);
app.delete('/api/products/:id', products_controller.delete);

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}.`);
    });