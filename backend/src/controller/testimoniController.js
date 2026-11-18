const testimoniModel = require('../models/testimoniModel');

const getAllTestimonies = async (req, res) => {
    try {
        const testimonies = await testimoniModel.getAllTestimonies();
        res.status(200).json({
            success: true,
            total: testimonies.length,
            data: testimonies
        });
    } catch (error) {
        console.error('Error fetching testimonies:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error', 
            error: error.message
        });
    }
};

const getTestimonyById = async (req, res) => {
    try {
        const { id } = req.params;
        const testimony = await testimoniModel.getTestimonyById(id);

        if (!testimony) {
            return res.status(404).json({
                success: false,
                message: 'data testimoni tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            data: testimony
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

const createTestimony = async (req, res) => {
    try {
        const data = req.body;
        if (!data.name || !data.role || !data.company || !data.message) {
            return res.status(400).json({
                success: false,
                message: 'Nama (name), peran (role), perusahaan (company), dan pesan (message) wajib diisi'
            });
        }

        const result = await testimoniModel.createTestimony(data);
        res.status(201).json({
            success: true,
            message: 'Testimoni berhasil ditambahkan',
            data: { id: result.insertId }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

const updateTestimony = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (!data.name || !data.role || !data.company || !data.message) {
            return res.status(400).json({
                success: false,
                message: 'Nama (name), peran (role), perusahaan (company), dan pesan (message) wajib diisi'
            });
        }

        const result = await testimoniModel.updateTestimony(id, data);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Data testimoni tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Testimoni berhasil diperbarui'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

const deleteTestimony = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await testimoniModel.deleteTestimony(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Data testimoni tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Testimoni berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

module.exports = {
    getAllTestimonies,
    getTestimonyById,
    createTestimony,
    updateTestimony,
    deleteTestimony
};