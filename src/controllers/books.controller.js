const { validationResult } = require("express-validator");
const BookService = require("../services/books.service");
const { successResponse, errorResponse } = require("../utils/responses");
const asyncHandler = require("../middleware/asyncHandler");

exports.getAll = asyncHandler(async (req, res) => {
  const data = BookService.getAll(req.query);
  return successResponse(res, "Daftar Buku", data, {
    search_result: req.query,
  });
});

exports.getById = asyncHandler(async (req, res) => {
  const book = BookService.getById(req.params.id);
  if (!book) return errorResponse(res, "Buku tidak ditemukan", [], 404);

  return successResponse(res, "Detail Buku", book);
});

exports.create = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, "Validasi gagal", errors.array());
  }

  const newBook = BookService.create(req.body);
  return successResponse(res, "Buku berhasil dibuat", newBook);
});

exports.update = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, "Validasi gagal", errors.array());
  }

  const updated = BookService.update(req.params.id, req.body);
  if (!updated) return errorResponse(res, "Buku tidak ditemukan", [], 404);

  return successResponse(res, "Buku berhasil diupdate", updated);
});

exports.delete = asyncHandler(async (req, res) => {
  const deleted = BookService.delete(req.params.id);
  if (!deleted) return errorResponse(res, "Buku tidak ditemukan", [], 404);

  return successResponse(res, "Buku berhasil dihapus");
});
