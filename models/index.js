
const Vote = require('./Vote');
const User = require('./User');
const Post = require("./Post");

// create associations // one to many relationship
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// create many-to-many associations // allows both the User and Post models to query each other's information in the context of a vote
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});
  
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

// associations to directly connect User model to Vote model to see total number of votes on post
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});
  
User.hasMany(Vote, {
    foreignKey: 'user_id'
});
  
Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Vote };
