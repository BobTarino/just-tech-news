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
// GET a single post
router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'post_url', 'title', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});
// Create a Post
router.post('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
      title: req.body.title,
      post_url: req.body.post_url,
      user_id: req.body.user_id
      // Sequelize will add created_at and updated_at
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});
// Update Post's Title
router.put('/:id', (req, res) => {
    Post.update(
        {
          title: req.body.title 
        }, 
        {
          where: {
           id: req.params.id
          } 
        }
    )
        .then(dbUserData => {
          if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});


module.exports = router;

