const express = require('express');
const route = require('./routes');
const cors = require('cors');
const cron = require('node-cron');
const {hour, minute} = require('./config/cron.json');
const PostController = require('./controllers/PostController');
const {PORT} = require('./config/config.json');
const app = express();
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(route);

cron.schedule(`${minute} ${hour} * * *`, async () => {
    console.log('Starting data upload...');
    await PostController.update();
    console.log('Data upload done!')
})

app.listen(PORT, () => {
    console.log('server running');
});