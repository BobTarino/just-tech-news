const router = require('express').Router();
const { Post, User } = require('../../models');


// get all users
router.get('/', (req, res) => {
    Post.findAll({
      attributes: ['id', 'post_url', 'title', 'created_at'],
      // JOIN with User table using include property
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      // remember to always include promise to capture reponse from db call
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;

