const router = require('express').Router();
const data = require('./global');
router.post('/book', data.addBook);
router.get('/book', data.getAllBook);
router.get('/book/:id', data.getBookById);
router.post('/book/:id', data.deleteBook);
router.post('/book/edit/:id', data.editBook);
module.exports = router;