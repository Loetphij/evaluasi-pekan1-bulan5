const { body } = require("express-validator");

exports.createAuthorValidation = [
  body("name").notEmpty().withMessage("Nama author wajib diisi"),
  body("country").notEmpty().withMessage("Negara asal wajib diisi"),
  body("age").isInt({ min: 1 }).withMessage("Umur harus angka dan > 0"),
];

exports.updateAuthorValidation = [
  body("name").optional().notEmpty(),
  body("country").optional().notEmpty(),
  body("age").optional().isInt({ min: 1 }),
];
