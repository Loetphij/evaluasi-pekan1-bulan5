const express = require("express");
const router = express.Router();
const controller = require("../controllers/authors.controller");
const { createAuthorValidation, updateAuthorValidation } = require("../validations/authors.validation");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", createAuthorValidation, controller.create);
router.put("/:id", updateAuthorValidation, controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
