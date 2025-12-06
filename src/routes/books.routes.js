const express = require("express");
const router = express.Router();
const controller = require("../controllers/books.controller");
const { createBookValidation, updateBookValidation } = require("../validations/books.validation");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", createBookValidation, controller.create);
router.put("/:id", updateBookValidation, controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
