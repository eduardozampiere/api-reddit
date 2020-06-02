const {DataTypes} = require('sequelize');
const db = require('../database');
const sequelize = db.sequelize;

const Post = sequelize.define('posts', {
    idReddit: {
        type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING
    },
    author: {
        type: DataTypes.STRING
    },
    created_reddit_utc: {
        type: DataTypes.INTEGER
    },
    ups: {
        type: DataTypes.INTEGER
    },
    num_comments: {
        type: DataTypes.INTEGER
    }
});

// Post.sync({force: true});

module.exports = Post;