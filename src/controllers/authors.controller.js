// controllers/author.controller.js

const { validationResult } = require("express-validator");
const AuthorService = require("../services/authors.service");
const { successResponse, errorResponse } = require("../utils/responses");
const asyncHandler = require("../middleware/asyncHandler");

exports.getAll = asyncHandler(async (req, res) => {
  const data = AuthorService.getAll(req.query);
  return successResponse(res, "Daftar Author", data, {
    search_result: req.query,
  });
});

exports.getById = asyncHandler(async (req, res) => {
  const author = AuthorService.getById(req.params.id);
  if (!author) return errorResponse(res, "Author tidak ditemukan", [], 404);

  return successResponse(res, "Detail Author", author);
});

exports.create = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, "Validasi gagal", errors.array());
  }

  const newAuthor = AuthorService.create(req.body);
  return successResponse(res, "Author berhasil dibuat", newAuthor);
});

exports.update = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, "Validasi gagal", errors.array());
  }

  const updated = AuthorService.update(req.params.id, req.body);
  if (!updated) return errorResponse(res, "Author tidak ditemukan", [], 404);

  return successResponse(res, "Author berhasil diupdate", updated);
});

exports.delete = asyncHandler(async (req, res) => {
  const deleted = AuthorService.delete(req.params.id);
  if (!deleted) return errorResponse(res, "Author tidak ditemukan", [], 404);

  return successResponse(res, "Author berhasil dihapus");
});
