const express = require('express');
const router = express.Router();
const testimonialController = require('../controller/testimonialController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// 1. GET (Publik / User): Semua pengunjung dapat membaca testimoni
router.get('/', testimonialController.getAllTestimonials);
router.get('/:id', testimonialController.getTestimonialById);

// 2. POST (User & Admin): User yang login boleh menambahkan testimoni/ulasan baru
router.post('/', verifyToken, authorizeRoles('admin', 'user'), testimonialController.createTestimonial);

// 3. Pagar Khusus ADMIN: Mengubah atau menghapus testimoni hanya boleh oleh Admin
router.put('/:id', verifyToken, authorizeRoles('admin'), testimonialController.updateTestimonial);
router.delete('/:id', verifyToken, authorizeRoles('admin'), testimonialController.deleteTestimonial);

module.exports = router;