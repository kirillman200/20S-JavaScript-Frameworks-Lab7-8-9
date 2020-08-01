const router = require('express').Router();

// Our resource routes
(require('./routes/users'))(router);
(require('./routes/blogs'))(router);
(require('./routes/sessions'))(router);

module.exports = router;