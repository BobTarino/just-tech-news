const router = require('express').Router();

router.get('/', (req, res) => {
    // render homepage.handlebars template
    res.render('homepage');
});

module.exports = router;