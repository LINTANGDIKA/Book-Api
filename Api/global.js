const { nanoid } = require('nanoid');
const book = require('../Data/book');

module.exports = {
    addBook: (req, res) => {
        // initial
        const {
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading, } = req.body;
        const id = nanoid(10);
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;
        const finished = pageCount === readPage;
        const dataBooks = {
            id,
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            insertedAt,
            updatedAt,
        };
        book.push(dataBooks);
        // if
        if (!name) {
            res.status(400).json({
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku',
            })
        }
        if (readPage > pageCount) {
            res.status(400).json({
                status: "fail",
                message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
            })
        }
        const success = book.filter((b) => b.id === id).length > 0;
        if (book.length !== 0 && success) {
            res.status(201).json({
                status: 'success',
                message: 'Buku berhasil ditambahkan',
                data: {
                    bookId: id,
                },
            })
        } else {
            res.status(500).json({
                status: "error",
                message: "Buku gagal ditambahkan"
            })
        }

    },
    editBook: (req, res) => {
        const id = req.params.id;
        const {
            name, year, author, summary, publisher, pageCount, readPage, reading,
        } = req.body;
        const updatedAt = new Date().toISOString();
        const index = book.findIndex((book) => book.id === id);
        const finished = (pageCount === readPage);

        if (index !== -1) {

            if (!name) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Gagal memperbarui buku. Mohon isi nama buku',
                });
            }
            if (pageCount < readPage) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
                });
            }


            book[index] = {
                ...book[index],
                name,
                year,
                author,
                summary,
                publisher,
                pageCount,
                readPage,
                finished,
                reading,
                updatedAt,
            };
            return res.status(200).json({
                status: 'success',
                message: 'Buku berhasil diperbarui',
            });
        }
    },
    getAllBook: (req, res) => {
        res.status(200).json({
            status: "success",
            data: {
                books: book.map((b) => ({
                    id: b.id,
                    name: b.name,
                    publisher: b.publisher
                }))
            }
        })
    },
    getBookById: (req, res) => {
        const id = req.params.id;
        const bookID = book.filter((b) => b.id === id)[0];
        if (bookID) {
            res.status(200).json({
                status: "success",
                data: {
                    bookID,
                }
            })
        } else {
            res.status(404).json({
                status: "fail",
                message: "Buku Tidak Ditemukan!"
            })
        }
    },
    deleteBook: (req, res) => {
        const id = req.params.id;
        const bookID = book.filter((b) => b.id === id)[0];
        if (bookID) {
            book.splice(bookID, 1);
            res.status(200).json({
                status: "success",
                message: 'Buku berhasil dihapus'
            });
        } else {
            return res.status(404).json({
                status: 'fail',
                message: 'Buku gagal dihapus. Id tidak ditemukan',
            });

        }
    }
}