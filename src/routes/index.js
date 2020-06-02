const express = require('express');
const route = express.Router();
const PostController = require('../controllers/PostController');

route.post('/', async (req, res) => {
        await PostController.update();
        return res.send({ok: true});
    }
);

route.get('/get/:i_date/:e_date/:order', PostController.get);
route.get('/get/:order', PostController.get);

route.get('/getUsers/:order', PostController.getUsers);

module.exports = route;