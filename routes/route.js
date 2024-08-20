const express = require('express');
const Router = express.Router();

const {data,getData} = require('../controllers/data');


Router.post('/senddata',data)
Router.get('/getData',getData)


module.exports = Router;  