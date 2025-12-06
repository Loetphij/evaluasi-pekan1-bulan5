const { body } = require("express-validator");

exports.createBookValidation = [
  body("title").notEmpty().withMessage("Judul wajib diisi"),
  body("author_id").notEmpty().withMessage("Penulis wajib diisi"),
  body("year").isInt({ min: 1 }).withMessage("Tahun harus angka dan > 0"),
];

exports.updateBookValidation = [
  body("title").optional().notEmpty(),
  body("author_id").optional().notEmpty(),
  body("year").optional().isInt({ min: 1 }),
];
